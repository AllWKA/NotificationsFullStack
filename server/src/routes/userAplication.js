module.exports = app => {

    const userApps = app.db.models.useraplications;

    app.get('/userAplications', (req, res) => {

        userApps.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    app.get('/devicesFromAplications/:aplicationID', (req, res) => {

        const aplicationID = req.params.aplicationID;

        userApps.findAll({
            where: { aplicationID: aplicationID }
        })
            .then(app => { res.json(app);})
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.get('/devicesFromUser/:userID', (req, res) => {

        const userID = req.params.userID;

        userApps.findAll({
            where: { userID: userID }
        })
            .then(app => { res.json(app);})
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.post('/devicesFromUser', (req, res) => {

        // const aplicationName = req.body.aplicationName;
        // const tokenAplication = req.body.tokenAplication;

        userApps.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });

};