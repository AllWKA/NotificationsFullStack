import * as admin from "firebase-admin";
import Sequelize from 'sequelize';
import { resolve } from "dns";
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
            console.log("-->",JSON.stringify(message));
            findApp(reqAppRes, message)
                .then(application => {
                    saveNotification(reqAppRes, message, application)
                        .then(notification => {
                            findDevices(reqAppRes, application, message, notification)
                                .then(devices => {
                                    findNotification(reqAppRes, notification, devices).then(notification => {
                                        saveTokensNotification(reqAppRes, notification, devices);
                                        packageNotifications(JSON.parse(JSON.stringify(devices)),
                                            reqAppRes.req.body.message, notification, reqAppRes)
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
        })
        .catch(error => res.status(412).json({ msg: error.message }));
}

function postMessage(reqAppRes) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.messages.create(reqAppRes.req.body.message)
            .then(message => { resolve(message) })
            .catch(error => { reject(error.message); });
    });
}

function findApp(reqAppRes, message) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.applications.findOne({
            where: { applicationName: reqAppRes.req.params.applicationName }
        })
            .then(application => { resolve(application); })
            .catch(error => { reject(error.message) });
    })
}

async function findDevices(reqAppRes, application, message, notification) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.devicetokens.findAll({
            where: { applicationID: JSON.parse(JSON.stringify(application)).idApplication }
        })
            .then(devices => { resolve(devices) })
            .catch(error => { reject(error.message) });
    });
}

async function findNotification(reqAppRes, createdNotification, devices) {
    return new Promise((resolve, reject) => {
        reqAppRes.app.db.models.notifications.findOne({
            where: {
                createdAt: createdNotification.createdAt,
                messageID: createdNotification.messageID
            }
        }).then(notification => { resolve(notification); })
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
            .then(tokenNotification => console.log("saved"))
            .catch(error => { console.log("-->saveTokenNotification Error:", error.message, tokenNotification) });
    }
}
function saveNotification(reqAppRes, message, application) {
    console.log("saveNotification-->",JSON.stringify(message));
    
    return new Promise((resolve, reject) => {
        findMessage(reqAppRes, message)
        .then(messageID=>{
            console.log("MENSAJE -->:",messageID);
            
            var newNotification = { messageID: messageID.idMessages }
            reqAppRes.app.db.models.notifications.create(newNotification)
                .then(notification => { resolve(notification) })
                .catch(error => reject(error.message));
        })
        .catch(error=>reject(error.message))        
    });
}

function findMessage(reqAppRes,message) {
    messageToFind = {

    }
    return new Promise((resolve,reject)=>{
        reqAppRes.app.db.models.messages.find({
            where: {
                body: message.body,
                title: message.title,
                label: message.label,
                createdAt: message.createdAt,
            }
        })
            .then(message => resolve(message))
            .catch(error => reject(error.message))
    })
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
                    getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification, notificationSaved, reqAppRes)
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
                sendNotificationToTokens(devices[numUsers - 1].deviceToken, notification, notificationSaved, reqAppRes)
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
                    getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes)
                        .then(tokens => {
                            sendNotificationToTokens(tokens, notification, notificationSaved, reqAppRes)
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

async function getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        var tokens = [];
        for (let index = start; index < end; index++) {
            tokens.push(devices[index].deviceToken);
        }
        resolve(tokens);
    })

}

async function sendNotificationToTokens(tokens, notification, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        //TODO: guardar notifiacion-token
        var payload = {
            notification: notification
        }
        //opciones de la notificacion
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }

        admin.messaging().sendToDevice(tokens, payload, options)
            .then((response) => { resolve(response); })
            .catch((error) => { reject(error.message) });
    });
}

function changeFailed(response, tokens, notificationSaved, reqAppRes) {
    return new Promise((resolve, reject) => {
        var failedTokens = [];
        for (let index = 0; index < response.results.length; index++) {
            if (response.results[index].error) { failedTokens.push(tokens[index]); }
        }
        reqAppRes.app.db.models.tokennotifications.update({ success: 0 },
            {
                where: {
                    notificationID: notificationSaved.notificationID,
                    deviceToken: { [Op.or]: failedTokens }
                }
            }
        ).then((response) => { resolve("failed:", response); })
            .catch((error) => { reject("errrrrror:", error.message) });
    });
}


function saveAnalytics(params) {

}