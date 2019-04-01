//TODO: metodos que gestionaran toda la informacion de las notificaciones
//modifyFailed
//SaveNotificationsTokens
//save stats
import * as admin from "firebase-admin";
//ruta al sdk admin
var serviceAccount = require("../../notifications-fullstack-firebase-adminsdk-art9c-ee1c9b68d3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //url a la que va a hacer el post para enviar la notificacion
    databaseURL: "https://notifications-fullstack.firebaseio.com"
});

module.exports.sendNotificationToApplication = (app, req, res) => {
    //finding the application
    console.log("sendNotificationToApplication");
    getMessage(req, app);
}

function getMessage(req, app) {
    console.log("getMessage");

    app.db.models.messages.findOne({
        where: { body: req.params.bodyMessage }
    }).then(message => {
        saveNotification(app, message, req);
        findApp(req, app);
    }).catch(error => console.log(error))
}

function findApp(req, app) {
    console.log("findApp", req.params);
    app.db.models.applications.findOne({
        where: { applicationName: req.params.applicationName }
    })
        .then(application => {
            //finding the users from applications
            findDevices(req, app);
        })
        .catch(error => { console.log(error.message); });
}

function findDevices(req, app) {
    console.log("findDevices", req.parms);

    app.db.models.devicetokens.findAll({
        where: { applicationID: JSON.parse(JSON.stringify(application)).idApplication }
    })
        .then(devices => {
            //sending the devices
            packageNotifications(JSON.parse(JSON.stringify(devices)), req.body.notification)

        })
        .catch(error => { console.log(error.message) });
}

function saveNotification(app, message, req) {
    console.log("saveNotification");

    var newNotification = { messageID: message.idMessages }
    app.db.models.notifications.create(newNotification)
        .then(notification => { console.log(notification) })
        .catch(error => console.log(error));

}

function packageNotifications(devices, notification) {
    console.log("packageNotifications");

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
                getTokensFromRange(start, end, devices, notification);
                start += 100;
            }
        }
        if (numUsers % 100 == 1 || numUsers == 1) {
            sendNotificationToTokens(devices[numUsers - 1].deviceToken, notification);
        }
        else {
            if (numUsers % 100 != 0 && start < numUsers) {
                // end += (numUsers - 1) - end;
                end = numUsers - 1;
                getTokensFromRange(start, end, devices, notification);
            }
        }
    } else { console.log("No hay clientes"); }
}

async function getTokensFromRange(start, end, devices, notification) {
    console.log("getTokensFromRange");

    var tokens = [];
    for (let index = start; index < end; index++) {
        tokens.push(devices[index].deviceToken);
    }
    sendNotificationToTokens(tokens, notification);
}

async function sendNotificationToTokens(tokens, notification) {
    console.log("sendNotificationToTokens");

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
            //TODO: mandar tokens fallidos y notificationId para modificarlos 
            const Analytics = app.db.models.analytics;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function saveTokensNotification(tokens) {

}

function saveAnalytics(params) {

}