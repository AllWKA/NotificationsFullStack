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
    app.db.models.applications.findOne({
        where: { applicationName: req.params.applicationName }
    })
        .then(application => {
            //finding the users from applications
            app.db.models.devicetokens.findAll({
                where: { applicationID: JSON.parse(JSON.stringify(application)).idApplication }
            })
                .then(devices => {
                    //sending the devices
                    packageNotifications(JSON.parse(JSON.stringify(devices)), req.body.notification)
                    res.json("sending your notifications");
                })
                .catch(error => { res.status(412).json({ msg: error.message }) });
        })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

function packageNotifications(devices, notification) {
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
                console.log("Enviando a los usuarios por el bucle: (" + start + "," + end + ")");
                getTokensFromRange(start, end, devices, notification);
                start += 100;
            }
        }
        if (numUsers % 100 == 1 || numUsers == 1) {
            console.log("Enviando al usuario: " + (devices[numUsers - 1].deviceToken));
            sendNotificationToTokens(devices[numUsers - 1].deviceToken, notification);
        }
        else {
            if (numUsers % 100 != 0 && start < numUsers) {
                // end += (numUsers - 1) - end;
                end = numUsers - 1;

                console.log("Enviando a los usuarios restantes: (" + start + "," + end + ")");
                getTokensFromRange(start, end, devices, notification);
            }
        }
    } else { console.log("No hay clientes"); }
}

function getTokensFromRange(start, end, devices, notification) {
    var tokens = [];
    for (let index = start; index < end; index++) {
        tokens.push(devices[index].deviceToken);
    }
    console.log("tokens del rango: " + tokens);
    sendNotificationToTokens(tokens, notification);
}

function sendNotificationToTokens(tokens, notification) {
    console.log("enviando notificiacion a los siguientes tokens: " + tokens);
    //la notificacion
    console.log(notification);

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

    console.log(payload);

    admin.messaging().sendToDevice(tokens, payload, options)
        .then(function (response) {
            //añado los datos de la respuesta a las estadisticas
            successCount += response.successCount;
            failureCount += response.failureCount;
            //TODO: mandar tokens fallidos y notificationId para modificarlos 
        })
        .catch(function (error) {
            console.log(error);
            ;
        });
}