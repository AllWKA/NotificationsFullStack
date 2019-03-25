import { getAllApps, appsAndUsers, getApp, usersFromApp, createApp, updateApp } from "../controllers/apps";
module.exports = app => {

    const Apps = app.db.models.applications;

    app.get('/apps', (req, res) => getAllApps(app, req, res));

    app.get('/appsAndUsers', (req, res) => appsAndUsers(app, req, res));

    app.get('/app/:applicationName', (req, res) => getApp(app, req, res));

    app.get('/usersFromApp/:applicationName', (req, res) => usersFromApp(app, req, res));

    app.get('/app/:id', (req, res) => {
        const id = req.params.id;
        Apps.find({
            where: { idapplication: id }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.post('/app', (req, res) => createApp(app, req, res));



    app.put("/app/:applicationName", (req, res, next) => updateApp(app, req, res));

    app.delete('/app/:applicationName', (req, res) => {

        const applicationName = req.params.applicationName;

        Apps.destroy(

            { where: { applicationName: applicationName } })

            .then(app => { res.json(app); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}