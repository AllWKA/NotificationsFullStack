import * as admin from "firebase-admin";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
//ruta al sdk admin
var serviceAccount = require("../../notifications-fullstack-firebase-adminsdk-art9c-ee1c9b68d3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //url a la que va a hacer el post para enviar la notificacion
    databaseURL: "https://notifications-fullstack.firebaseio.com"
});

module.exports.sendNotificationToApplication = (app, req, res) => {
    //finding the application
    console.log("-->sendNotificationToApplication");
    var reqAppRes = { req, app, res };
    getMessage(reqAppRes);
}

function getMessage(reqAppRes) {
    console.log("-->getMessage");

    reqAppRes.app.db.models.messages.findOne({
        where: { body: reqAppRes.req.params.bodyMessage }
    })
        .then(message => {
            //solo se guardara la notificacion y se buscaran los dispositivos
            //si el mensaje esta dentro de la base de datos.
            findApp(reqAppRes, message);
        })
        .catch(error => { reqAppRes.res.status(412).json({ msg: error.message }) });
}

function findApp(reqAppRes, message) {
    console.log("-->findApp");
    reqAppRes.app.db.models.applications.findOne({
        where: { applicationName: reqAppRes.req.params.applicationName }
    })
        .then(application => {
            //finding the users from applications
            saveNotification(reqAppRes, message, application);
        })
        .catch(error => { reqAppRes.res.status(412).json({ msg: error.message }) });
}

async function findDevices(reqAppRes, application, message, notification) {
    console.log("-->findDevices");

    reqAppRes.app.db.models.devicetokens.findAll({
        where: { applicationID: JSON.parse(JSON.stringify(application)).idApplication }
    })
        .then(devices => {
            //sending the devices
            //TODO: SAVE TOKENnOTIFICATION
            console.log("--->findDevicesNotification:", JSON.stringify(notification));

            findNotification(reqAppRes, notification, devices);
        })
        .catch(error => { reqAppRes.res.status(412).json({ msg: error.message }) });
}

async function findNotification(reqAppRes, createdNotification, devices) {
    console.log("--->finding notification");

    reqAppRes.app.db.models.notifications.findOne({
        where: {
            createdAt: createdNotification.createdAt,
            messageID: createdNotification.messageID
        }
    }).then(notification => {
        saveTokensNotification(reqAppRes, notification, devices);
        packageNotifications(JSON.parse(JSON.stringify(devices)), reqAppRes.req.body.notification, notification, reqAppRes);
    })
        .catch(error => { console.log("-->findingNotification Error:", error.message) });
}
function saveTokensNotification(reqAppRes, notification, devices) {
    console.log("--->saveTokensNotification");

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
    console.log("-->saveNotification");
    //save tokenNotification
    var newNotification = { messageID: message.idMessages }
    reqAppRes.app.db.models.notifications.create(newNotification)
        .then(notification => {
            findDevices(reqAppRes, application, message, notification);
        })
        .catch(error => reqAppRes.res.status(412).json({ msg: error.message }));
}

function packageNotifications(devices, notification, notificationSaved, reqAppRes) {
    console.log("-->packageNotifications");

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
                getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes);
                start += 100;
            }
        }
        if (numUsers % 100 == 1 || numUsers == 1) {
            sendNotificationToTokens(devices[numUsers - 1].deviceToken, notification, notificationSaved, reqAppRes);
        }
        else {
            if (numUsers % 100 != 0 && start < numUsers) {
                // end += (numUsers - 1) - end;
                end = numUsers - 1;
                getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes);
            }
        }
    } else { reqAppRes.res.status(412).json({ msg: "0 clients" }) }
}

async function getTokensFromRange(start, end, devices, notification, notificationSaved, reqAppRes) {
    console.log("-->getTokensFromRange");

    var tokens = [];
    for (let index = start; index < end; index++) {
        tokens.push(devices[index].deviceToken);
    }
    sendNotificationToTokens(tokens, notification, notificationSaved, reqAppRes);
}

async function sendNotificationToTokens(tokens, notification, notificationSaved, reqAppRes) {
    console.log("-->sendNotificationToTokens");

    //TODO: guardar notifiacion-token
    var payload = {
        notification: notification
    }
    //opciones de la notificacion
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    }
    //estadisticas de exito y fallo
    var successCount = 0;
    var failureCount = 0;

    admin.messaging().sendToDevice(tokens, payload, options)
        .then(function (response) {
            //añado los datos de la respuesta a las estadisticas
            successCount += response.successCount;
            failureCount += response.failureCount;
            reqAppRes.res.json(response);
            changeFailed(response, tokens, notificationSaved, reqAppRes);
            //TODO: mandar tokens fallidos y notificationId para modificarlos 
        })
        .catch((error) => { console.log("errrrrror:", error.message) });
}

function changeFailed(response, tokens, notificationSaved, reqAppRes) {
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
    ).then((response) => { console.log("failed:", response); })
        .catch((error) => { console.log("errrrrror:", error.message) });
}


function saveAnalytics(params) {

}