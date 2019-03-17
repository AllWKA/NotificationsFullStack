import * as admin from "firebase-admin";

var serviceAccount = require("../../notifications-fullstack-firebase-adminsdk-art9c-ee1c9b68d3.json");


module.exports = app => {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://notifications-fullstack.firebaseio.com"
    });

    var registrationToken = "eEvuXca6t8o:APA91bF4TG9wkBdvmyA1C2BYfThIAUH8nKWRVkaiaozz1NC0IduXsI3ftNcBIELUSoW3a1hNSMeB2lx68QxCEQ4Ekvf1lJOF-hxb7_EvZa4rmpkRBuY_WZFj1qWLOhaoQibUFhJpALc4";

    app.post('/sendNotification', (req, res) => {

        var payload = {
            notification: {
                title: 'Example title message',
                body: 'Example body message'
            },
            data: {
                MyKey1: "Hello"
            }
        }

        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }

        admin.messaging().sendToDevice(registrationToken, payload, options)
            .then(function (response) {
                console.log("Successfully sent message:", response);
                res.json(response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });


    });
}