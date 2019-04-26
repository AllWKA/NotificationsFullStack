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

import { sendNotificationToApplication, sendNotificationToTopic } from "../controllers/notifications";


module.exports = app => {
  app.post('/sendNotificationToApplication/:applicationName', (req, res) => sendNotificationToApplication(app, req, res));
  app.post('/sendNotificationToTopic/:topic', (req, res) => sendNotificationToTopic(app, req, res));
}