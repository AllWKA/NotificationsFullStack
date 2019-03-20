/*
En la siguiente solicitud de envío, se envía un mismo título y contenido de notificación a todas las plataformas, pero también se envían algunas anulaciones específicas de la plataforma. En detalle, la solicitud realiza lo siguiente:

    Configura un tiempo de vida prolongado para Android, junto con un ícono y un color especiales que se mostrarán en dispositivos Android.

    Configura el campo badge exclusivo de iOS en la carga útil de APNS para la entrega a dispositivos iOS.

var message = {
  notification: {
    title: '$GOOG up 1.43% on the day',
    body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
  },
  android: {
    ttl: 3600 * 1000,
    notification: {
      icon: 'stock_ticker_update',
      color: '#f45342',
    },
  },
  apns: {
    payload: {
      aps: {
        badge: 42,
      },
    },
  },
  topic: 'industry-tech'
};*/

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

        //recorro todos los clientes de una aplicacion y les envio la notificacion usando su token en la bd
        for (let index = 0; index < req.body.users.length; index++) {
            //enviando la notificacion
            admin.messaging().sendToDevice(req.body.users[index].useraplications.deviceToken, payload, options)
                .then(function (response) {
                    //añado los datos de la respuesta a las estadisticas
                    successCount += response.successCount;
                    failureCount += response.failureCount;
                    console.log(response);

                    //devuelvo en la respuesta als estadisticas de fallos y exitos
                    res.json({ 'successCount': successCount, 'failureCount': failureCount });
                })
                .catch(function (error) {
                    res.json(error);
                });
        }
    });
}