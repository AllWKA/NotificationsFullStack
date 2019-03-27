import * as admin from "firebase-admin";
import { sendNotificationToApplication } from "../controllers/notifications";


module.exports = app => {
    app.post('/sendNotificationToApplication/:applicationName', (req, res) => sendNotificationToApplication(app, req, res));
}