module.exports = app => {

    const Messages = app.db.models.messages;

    app.get('/messages', (req, res) => {

        Messages.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });


    app.get('/appsAndMessages', (req, res) => {

        Messages.findAll({
            include: [{ model: app.db.models.applications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/notificationsAndMessages', (req, res) => {

        Messages.findAll({
            include: [{ model: app.db.models.notifications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/topicsAndMessages', (req, res) => {

        Messages.findAll({
            include: [{ model: app.db.models.topics }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/app/:id', (req, res) => {

        const id = req.params.id;

        Apps.find({

            where: { idapplication: id }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.get('/usersFromApp/:applicationName', (req, res) => {

        const applicationName = req.params.applicationName;

        Apps.find({
            include: [{ model: app.db.models.users }],
            where: { applicationName: applicationName }
        })
            .then(app => { app.getUsers().then(users => { res.json(users); }); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });

    app.post('/app', (req, res) => {

        // const applicationName = req.body.applicationName;
        // const tokenapplication = req.body.tokenapplication;

        Apps.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });

    app.get('/app/:id', (req, res) => {

        const id = req.params.id;

        Apps.find({

            where: { idapplication: id }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.put("/app/:applicationName", (req, res, next) => {

        const applicationName = req.params.applicationName;
        const applicationNameNew = req.body.applicationName;
        const tokenapplication = req.body.tokenapplication;

        console.log(req.body);


        Apps.update(
            {
                nameapplication: applicationNameNew,
                tokenapplication: tokenapplication
            },

            { where: { applicationName: applicationName } })

            .then(rowsUpdated => { res.json(rowsUpdated); })

            .catch(next);
    });

    app.delete('/app/:applicationName', (req, res) => {

        const applicationName = req.params.applicationName;

        Apps.destroy(

            { where: { applicationName: applicationName } })

            .then(app => { res.json(app); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}