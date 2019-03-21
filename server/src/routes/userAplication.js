module.exports = app => {

    const userApps = app.db.models.userapplications;

    app.get('/userApplications', (req, res) => {

        userApps.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    app.get('/devicesFromApplications/:applicationID', (req, res) => {

        const applicationID = req.params.applicationID;

        userApps.findAll({
            where: { applicationID: applicationID }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.get('/devicesFromUser/:userID', (req, res) => {

        const userID = req.params.userID;

        userApps.findAll({
            where: { userID: userID }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.post('/userApplications', (req, res) => {

        // const applicationName = req.body.applicationName;
        // const tokenApplication = req.body.tokenApplication;

        userApps.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.put('/userApplications/:userID/:applicationID/:deviceToken', (req, res) => {

        const userID = req.body.userID;
        const applicationID = req.body.applicationID;

        userApps.update(
            req.body,
            {
                where: {
                    userID: req.params.userID,
                    applicationID: req.params.applicationID,
                    deviceToken: req.params.deviceToken

                }
            }
        )
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.delete('/userApplications/:userID/:applicationID/:deviceToken', (req, res) => {

        userApps.destroy(
            {
                where: {
                    userID: req.params.userID,
                    applicationID: req.params.applicationID,
                    deviceToken: req.params.deviceToken
                }
            })

            .then(app => { res.json(app); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });
};