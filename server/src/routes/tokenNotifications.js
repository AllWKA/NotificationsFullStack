import { tokenNotificationFromApplicationSuccess, tokenNotificationFromApplicationFailed, tokenNotificationFromUser } from "../controllers/tokenNotifications";
module.exports = app => {

    const TokenNotifications = app.db.models.tokennotifications;

    app.get('/tokenNotifications', (req, res) => {
        //Done
        TokenNotifications.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.get('/tokenNotificationsFromUser/:email/:applicationName', (req, res) => { tokenNotificationFromUser(app, req, res) });

    app.get('/tokenNotificationFromApplicationSuccess/:applicationName', (req, res) => { tokenNotificationFromApplicationSuccess(app, req, res); });

    app.get('/tokenNotificationFromApplicationFailed/:applicationName', (req, res) => { tokenNotificationFromApplicationFailed(app, req, res); });

    app.get('/tokenNotificationsFromDevice/:token', (req, res) => {
        //Done
        TokenNotifications.findAll({
            where: { deviceToken: req.params.token }
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });
    app.get('/tokenNotificationsFromNotification/:id', (req, res) => {
        //Done
        TokenNotifications.findAll({
            where: { notificationID: req.params.id }
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });
    app.get('/tokenNotificationsFromNotificationSucceeded/:id', (req, res) => {
        //Done
        TokenNotifications.findAll({
            where: {
                notificationID: req.params.id,
                success: 1
            }
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });
    app.get('/tokenNotificationsFromNotificationFailed/:id', (req, res) => {
        //Done
        TokenNotifications.findAll({
            where: {
                notificationID: req.params.id,
                success: 0
            }
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.get('/appsAndMessages', (req, res) => {
        //Done
        TokenNotifications.findAll({
            include: [{ model: app.db.models.applications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/notificationsAndMessages', (req, res) => {
        //Done
        TokenNotifications.findAll({
            include: [{ model: app.db.models.notifications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/topicsAndMessages', (req, res) => {
        //Done
        TokenNotifications.findAll({
            include: [{ model: app.db.models.topics }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.post('/tokenNotification', (req, res) => {
        //Done
        TokenNotifications.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });
    });

    app.put("/tokenNotification/:applicationID/:deviceToken/:notificationID", (req, res, next) => {
        //Done
        TokenNotifications.update(
            req.body,
            {
                where: {
                    applicationID: req.params.applicationID,
                    deviceToken: req.params.deviceToken,
                    notificationID: req.params.notificationID
                }
            })
            .then(rowsUpdated => { res.json(rowsUpdated); })
            .catch(next);
    });

    app.delete('/tokenNotification/:applicationID/:deviceToken/:notificationID', (req, res) => {
        //Done
        TokenNotifications.destroy(
            {
                where: {
                    applicationID: req.params.applicationID,
                    deviceToken: req.params.deviceToken,
                    notificationID: req.params.notificationID
                }
            })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}