import * as admin from "firebase-admin";
import Sequelize from 'sequelize';
// import { resolve } from "dns";
const Op = Sequelize.Op;
//ruta al sdk admin
var serviceAccount = require("../../notifications-fullstack-firebase-adminsdk-art9c-ee1c9b68d3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //url a la que va a hacer el post para enviar la notificacion
    databaseURL: "https://notifications-fullstack.firebaseio.com"
});

module.exports.sendNotificationToTopic = async (app, req, res) => {
    var reqAppRes = { req, app, res };

    var message = await postMessage(reqAppRes);
    var application = findApp(reqAppRes, message);
    var topic = findTopic(reqAppRes, message);
    var notifiacion = saveNotification(reqAppRes, message);

    Promise.all([application, topic, notifiacion]).then(async (values) => {
        var usersTopics = await findUsersFromTopic(reqAppRes, values[1], values[0]);
        var devices = await findDevicesFromTopic(reqAppRes, values[0], usersTopics);

        saveTokensNotification(reqAppRes, values[1], devices);
        packageNotifications(JSON.parse(JSON.stringify(devices)), reqAppRes.req.body, values[2], reqAppRes);

    });

}

module.exports.sendNotificationToApplication = async (app, req, res) => {

    var reqAppRes = { req, app, res };
    var message = await postMessage(reqAppRes);
    var application = findApp(reqAppRes, message);
    var notification = saveNotification(reqAppRes, message);

    Promise.all([application, notification]).then(async (values) => {
        var devices = await findDevices(reqAppRes, values[0].idApplication);
        saveTokensNotification(reqAppRes, values[1], devices);
        packageNotifications(JSON.parse(JSON.stringify(devices)), reqAppRes.req.body, values[1], reqAppRes);
    });


}

function findDevicesFromTopic(reqAppRes, application, usersTopics) {
    return new Promise((resolve, reject) => {
        getIdsFromUsersTopics(usersTopics)
            .then(ids => {
                reqAppRes.app.db.models.devicetokens.findAll({
                    where: {
                        applicationID: application.idApplication,
                        active: true,
                        userID: {
                            [Op.or]: ids
                        }
                    }
                })
                    .then(devices => { resolve(devices); })
                    .catch(error => { reject(error.message) });
            }).catch(error => { reject(error.message) });
    });
}

function getIdsFromUsersTopics(usersTopics) {

    return new Promise((resolve, reject) => {
        var idUsers = []

        for (let index = 0; index < usersTopics.length; index++) {
            idUsers.push(usersTopics[index].userID)
        }
        resolve(idUsers);
    })
}

function findTopic(reqAppRes, message) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.topics.findOne({
            where: {
                topic: reqAppRes.req.params.topic
            }
        })
            .then(topic => {
                topic.addMessage(message);
                resolve(topic)
            })
            .catch(error => reject(error))
    });
}

function findUsersFromTopic(reqAppRes, topic, application) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.usertopics.findAll({
            where: {
                topicID: topic.idTopics,
                applicationID: application.idApplication
            }
        })
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    });
}

function postMessage(reqAppRes) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.messages.create(reqAppRes.req.body)
            .then(message => { resolve(message) })
            .catch(error => { reject(error.message); });
    });
}

function findApp(reqAppRes, message) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.applications.findOne({
            where: { applicationName: reqAppRes.req.params.applicationName }
        })
            .then(application => {
                //añado la relacion entre la applicaciony el mensaje que se envia a esta
                application.addMessage(message);
                resolve(application);
            })
            .catch(error => { reject(error.message) });
    })
}

function findDevices(reqAppRes, application) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.devicetokens.findAll({
            where: {
                applicationID: application,
                active: 1
            }
        })
            .then(devices => { resolve(devices) })
            .catch(error => { reject(error.message) });
    });
}

function saveTokensNotification(reqAppRes, notification, devices) {
    for (let i = 0; i < devices.length; i++) {
        var tokenNotification = {
            userID: devices[i].userID,
            applicationID: devices[i].applicationID,
            deviceToken: devices[i].deviceToken,
            notificationID: notification.notificationID,
        };
        reqAppRes.app.db.models.tokennotifications.create(tokenNotification)
            .then(tokenNotification => console.log("Notification Saved", JSON.stringify(tokenNotification)))
            .catch(error => { console.log("saveTokenNotification Error:", error.message) });
    }
}
function saveNotification(reqAppRes, message) {
    return new Promise((resolve, reject) => {
        var newNotification = { messageID: message.idMessages }
        reqAppRes.app.db.models.notifications.create(newNotification)
            .then(notification => { resolve(notification) })
            .catch(error => reject(error.message));
    });
}
//esta funcion dividira, si es necesario, a los usuarios de 100 en 100
//cada notificacion tendra como maximo 100 dispositivos(tokens).
function packageNotifications(devices, notification, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        var numUsers = devices.length;
        var start = 0;
        var end;
        //compruebo que la applicacion tenga usuarios
        if (numUsers > 0) {
            //si solo hay uno
            if (numUsers == 1) { end = 0 }
            else {
                //si hay menos de 100 usuarios se envian al num usuarios totales
                if (numUsers < 100) { end = numUsers; }
                else { end = 99; }
            }
            if (numUsers > 1) {
                for (end; 0 <= numUsers - end; end += 100) {
                    getTokensFromRange(start, end, devices)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification)
                                .then(response => {
                                    changeFailed(response, tokens, notificationSaved, reqAppRes, devices)
                                        .then(response => resolve(response))
                                        .catch(error => reject(error.message));
                                })
                                .catch(error => reject(error.message));
                        })
                        .catch(error => reject(error.message));
                    start += 100;
                }
            }
            if (numUsers % 100 == 1 || numUsers == 1) {
                sendNotificationToTokens(devices[numUsers - 1].deviceToken, notification)
                    .then(response => {
                        changeFailed(response, tokens, notificationSaved, reqAppRes, devices)
                            .then(response => resolve(response))
                            .catch(error => reject(error.message));
                    })
                    .catch(error => reject(error.message));;
            }
            else {
                if (numUsers % 100 != 0 && start < numUsers) {
                    end = numUsers - 1;
                    getTokensFromRange(start, end, devices)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification)
                                .then(response => {
                                    changeFailed(response, tokens, notificationSaved, reqAppRes, devices)
                                        .then(response => resolve(response))
                                        .catch(error => reject(error.message));
                                })
                                .catch(error => reject(error.message));
                        });
                }
            }
        } else { reject("0 clients") }
    });
}

async function getTokensFromRange(start, end, devices) {
    return new Promise((resolve, reject) => {
        var tokens = [];
        for (let index = start; index < end; index++) {
            tokens.push(devices[index].deviceToken);
        }
        resolve(tokens);
    })

}

async function sendNotificationToTokens(tokens, notification) {
    console.log(tokens);

    return new Promise((resolve, reject) => {
        //TODO: guardar notifiacion-token
        var payload = { notification: notification }
        //opciones de la notificacion
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }

        admin.messaging().sendToDevice(tokens, payload, options)
            .then((response) => resolve(response))
            .catch((error) => reject(error.message));
    });
}

function changeFailed(response, tokens, notificationSaved, reqAppRes, devices) {
    return new Promise((resolve, reject) => {
        for (let index = 0; index < response.results.length; index++) {
            if (response.results[index].error) {
                switch (response.results[index].error.code) {
                    case "messaging/invalid-argument":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 2);
                        break;
                    case "messaging/invalid-recipient":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 3);
                        break;
                    case "messaging/invalid-payload":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 4);
                        break;
                    case "messaging/invalid-data-payload-key":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 5);
                        break;
                    case "messaging/payload-size-limit-exceeded":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 6);
                        break;
                    case "messaging/invalid-options":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 7);
                        break;
                    case "messaging/invalid-registration-token":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 8);
                        break;
                    case "messaging/registration-token-not-registered":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 9);
                        break;
                    case "messaging/invalid-package-name":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 10);
                        break;
                    case "messaging/message-rate-exceeded":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 11);
                        break;
                    case "messaging/device-message-rate-exceeded":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 12);
                        break;
                    case "messaging/topics-message-rate-exceeded":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 13);
                        break;
                    case "messaging/too-many-topics":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 14);
                        break;
                    case "messaging/invalid-apns-credentials":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 15);
                        break;
                    case "messaging/mismatched-credential":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 16);
                        break;
                    case "messaging/authentication-error":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 17);
                        break;
                    case "messaging/server-unavailable":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 18);
                        break;
                    case "messaging/internal-error":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 19);
                        break;
                    case "messaging/unknown-error":
                        saveError(reqAppRes, notificationSaved.notificationID, tokens[index], 20);
                        break;
                    default:
                        break;
                }
                console.log("procediendo");
                disableToken(tokens[index], devices[index], reqAppRes);
            }
        }
        resolve("All Devices done");

    });
}

function disableToken(token, devices, reqAppRes) {
    reqAppRes.app.db.models.devicetokens.update({ active: 0 },
        {
            where: {
                deviceToken: token,
                applicationID: devices.applicationID
            }
        }
    )
        .then((response) => { console.log("\n----------->disable token:", JSON.stringify(response)); })
        .catch((error) => { console.log("errrrrror:", error.message) });
}

function saveError(reqAppRes, notificationID, token, error) {
    reqAppRes.app.db.models.tokennotifications.update({ success: error },
        {
            where: {
                notificationID: notificationID,
                deviceToken: token
            }
        }
    )
        .then((response) => { console.log("\n----------->failed:", JSON.stringify(response)); })
        .catch((error) => { console.log("errrrrror:", error.message) });
}