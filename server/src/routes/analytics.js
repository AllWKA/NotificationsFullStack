module.exports = app => {
    //TODO: TODO xd
    //no enserio, terminalo
    const Analytics = app.db.models.analytics;

    // app.get('/analytics', (req, res) => {

    //     Analytics.findAll()
    //         .then(result => res.json(result))
    //         .catch(error => { res.status(412).json({ msg: error.message }); });

    // });


    // app.get('/appsAndUsers', (req, res) => {

    //     Analytics.findAll({
    //         include: [{ model: app.db.models.users }]
    //     })
    //         .then(result => res.json(result))
    //         .catch(error => { res.status(412).json({ msg: error.message }); });

    // });

    // app.get('/app/:id', (req, res) => {

    //     const id = req.params.id;

    //     Analytics.find({

    //         where: { idapplication: id }
    //     })
    //         .then(app => { res.json(app); })
    //         .catch(error => { res.status(412).json({ msg: error.message }); });
    // });

    // app.get('/usersFromApp/:applicationName', (req, res) => {

    //     const applicationName = req.params.applicationName;

    //     Analytics.find({
    //         include: [{ model: app.db.models.users }],
    //         where: { applicationName: applicationName }
    //     })
    //         .then(app => { app.getUsers().then(users => { res.json(users); }); })
    //         .catch(error => { res.status(412).json({ msg: error.message }) });;
    // });

    // app.post('/app', (req, res) => {

    //     // const applicationName = req.body.applicationName;
    //     // const tokenapplication = req.body.tokenapplication;

    //     Analytics.create(req.body)
    //         .then(app => { res.json(app); })
    //         .catch(error => { res.status(412).json({ msg: error.message }) });

    // });

    // app.get('/app/:id', (req, res) => {

    //     const id = req.params.id;

    //     Analytics.find({

    //         where: { idapplication: id }
    //     })
    //         .then(app => { res.json(app); })
    //         .catch(error => { res.status(412).json({ msg: error.message }); });
    // });

    // app.put("/app/:applicationName", (req, res, next) => {

    //     const applicationName = req.params.applicationName;
    //     const applicationNameNew = req.body.applicationName;
    //     const tokenapplication = req.body.tokenapplication;

    //     console.log(req.body);


    //     Analytics.update(
    //         {
    //             nameapplication: applicationNameNew,
    //             tokenapplication: tokenapplication
    //         },

    //         { where: { applicationName: applicationName } })

    //         .then(rowsUpdated => { res.json(rowsUpdated); })

    //         .catch(next);
    // });

    // app.delete('/app/:applicationName', (req, res) => {

    //     const applicationName = req.params.applicationName;

    //     Analytics.destroy(

    //         { where: { applicationName: applicationName } })

    //         .then(app => { res.json(app); })

    //         .catch(error => { res.status(412).json({ msg: error.message }); });
    // });

}