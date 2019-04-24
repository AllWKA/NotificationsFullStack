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

module.exports.sendNotificationToApplication = (app, req, res) => {
    var reqAppRes = { req, app, res };
    postMessage(reqAppRes)
        .then(message => {
            findApp(reqAppRes, message)
                .then(application => {
                    saveNotification(reqAppRes, message)
                        .then(notification => {
                            findDevices(reqAppRes, application)
                                .then(devices => {
                                    saveTokensNotification(reqAppRes, notification, devices);
                                    packageNotifications(JSON.parse(JSON.stringify(devices)),
                                        reqAppRes.req.body, notification, reqAppRes)
                                        .then(response => res.json(response))
                                        .catch(error => res.status(412).json({ msg: error.message }))

                                })
                                .catch(error => res.status(412).json({ msg: error.message }));
                        })
                        .catch(error => res.status(412).json({ msg: error.message }));
                })
                .catch(error => res.status(412).json({ msg: error.message }));
        })
        .catch(error => res.status(412).json({ msg: error.message }));
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
                application.addMessage(message);
                resolve(application);
            })
            .catch(error => { reject(error.message) });
    })
}

async function findDevices(reqAppRes, application) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.devicetokens.findAll({
            where: { applicationID: JSON.parse(JSON.stringify(application)).idApplication }
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
            .then(tokenNotification => console.log("Notification Saved"))
            .catch(error => { console.log("-->saveTokenNotification Error:", error.message, tokenNotification) });
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

function packageNotifications(devices, notification, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        var numUsers = devices.length;
        var start = 0;
        var end;
        if (numUsers > 0) {
            if (numUsers == 1) { end = 0 }
            else {
                if (numUsers < 100) { end = numUsers; }
                else { end = 99; }
            }
            if (numUsers > 1) {
                for (end; 0 <= numUsers - end; end += 100) {
                    getTokensFromRange(start, end, devices)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification)
                                .then(response => {
                                    changeFailed(response, tokens, notificationSaved, reqAppRes)
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
                        changeFailed(response, tokens, notificationSaved, reqAppRes)
                            .then(response => resolve(response))
                            .catch(error => reject(error.message));
                    })
                    .catch(error => reject(error.message));;
            }
            else {
                if (numUsers % 100 != 0 && start < numUsers) {
                    // end += (numUsers - 1) - end;
                    end = numUsers - 1;
                    getTokensFromRange(start, end, devices)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification)
                                .then(response => {
                                    changeFailed(response, tokens, notificationSaved, reqAppRes)
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
    console.log("EN sEND NOTIFICATION:", notification);

    return new Promise((resolve, reject) => {
        //TODO: guardar notifiacion-token
        var payload = { notification: notification }
        //opciones de la notificacion
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }

        admin.messaging().sendToDevice(tokens, payload, options)
            .then((response) => {

                resolve(response);
            })
            .catch((error) => { reject(error.message) });
    });
}

function changeFailed(response, tokens, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        var failedTokens = [];
        for (let index = 0; index < response.results.length; index++) {
            if (response.results[index].error) {
                console.log("\n\n\n\nFallo:", JSON.stringify(response.results[index].error.code));

                failedTokens.push(tokens[index]);
                // switch (key) {
                //     case value:

                //         break;

                //     default:
                //         break;
                // }
            }
        }
        reqAppRes.app.db.models.tokennotifications.update({ success: 0 },
            {
                where: {
                    notificationID: notificationSaved.notificationID,
                    deviceToken: { [Op.or]: failedTokens }
                }
            }
        )
            .then((response) => { resolve("failed:", failedTokens.length); })
            .catch((error) => { reject("errrrrror:", error.message) });
    });
}


function saveAnalytics(params) {

}