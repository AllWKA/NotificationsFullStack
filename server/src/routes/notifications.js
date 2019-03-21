import * as admin from "firebase-admin";

//ruta al sdk admin
var serviceAccount = require("../../notifications-fullstack-firebase-adminsdk-art9c-ee1c9b68d3.json");

module.exports = app => {

    //inicializo la variable admin para conectarse al servicio de firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        //url a la que va a hacer el post para enviar la notificacion
        databaseURL: "https://notifications-fullstack.firebaseio.com"
    });

    app.post('/sendNotification', (req, res) => {

        //la notificacion
        var payload = {
            notification: req.body.notification
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
            admin.messaging().sendToDevice(req.body.users[index].userapplications.deviceToken, payload, options)
                .then(function (response) {
                    //añado los datos de la respuesta a las estadisticas
                    successCount += response.successCount;
                    failureCount += response.failureCount;
                })
                .catch(function (error) {
                    res.json(error);
                });
        }
        //devuelvo en la respuesta als estadisticas de fallos y exitos
        res.json({ 'successCount': successCount, 'failureCount': failureCount });
    });
}