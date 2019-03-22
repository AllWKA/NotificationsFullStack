module.exports = app => {

    const DeviceTokens = app.db.models.devicetokens;

    app.get('/deviceTokens', (req, res) => {

        DeviceTokens.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    app.get('/devicesFromApplications/:applicationID', (req, res) => {

        const applicationID = req.params.applicationID;

        DeviceTokens.findAll({
            where: { applicationID: applicationID }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.get('/devicesFromUser/:userID', (req, res) => {

        const userID = req.params.userID;

        DeviceTokens.findAll({
            where: { userID: userID }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.post('/deviceTokens', (req, res) => {

        // const applicationName = req.body.applicationName;
        // const tokenApplication = req.body.tokenApplication;

        DeviceTokens.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.put('/deviceTokens/:userID/:applicationID/:deviceToken', (req, res) => {

        const userID = req.body.userID;
        const applicationID = req.body.applicationID;

        DeviceTokens.update(
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
    app.delete('/deviceTokens/:userID/:applicationID/:deviceToken', (req, res) => {

        DeviceTokens.destroy(
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