//TODO: metodos que gestionaran toda la informacion de las notificaciones
//modifyFailed
//SaveNotificationsTokens
//save stats
import * as admin from "firebase-admin";

function saveNotification(Notifications, notification, tokens) {

    Notifications.create(notification)
        .then(res => {
            sendNotification(notification);
            return res;
        })
        .catch(error => { res.status(412).json({ msg: error.message }) });

}

function sendNotification(notification) {
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

    //recorro todos los clientes de una applicacion y les envio la notificacion usando su token en la bd
    for (let index = 0; index < req.body.users.length; index++) {
        //enviando la notificacion
        //TODO: guardar en la tabla tokenNotification antes de mandar la notificacion
        admin.messaging().sendToDevice(req.body.users[index].userapplications.deviceToken, payload, options)
            .then(function (response) {
                //añado los datos de la respuesta a las estadisticas
                successCount += response.successCount;
                failureCount += response.failureCount;
                //TODO: mandar tokens fallidos y notificationId para modificarlos 
            })
            .catch(function (error) {
                res.json(error);
            });
    }
}