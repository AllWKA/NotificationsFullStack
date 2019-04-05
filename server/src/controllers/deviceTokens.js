module.exports.getDevices = (app, req, res) => {
    app.db.models.devicetokens.findAll()
        .then(result => res.json(result))
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.devicesFroAplication = (app, req, res) => {
    app.db.models.devicetokens.findAll({
        where: { applicationID: req.params.applicationID }
    })
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.devicesFromUser = (app, req, res) => {
    app.db.models.devicetokens.findAll({
        where: { userID: req.params.userID }
    })
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.createDevice = (app, req, res) => {
    app.db.models.devicetokens.create(req.body)
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.updateDevice = (app, req, res) => {
    app.db.models.devicetokens.update(
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
}

module.exports.deleteDevice = (app, req, res) => {
    app.db.models.devicetokens.destroy(
        {
            where: {
                userID: req.params.userID,
                applicationID: req.params.applicationID,
                deviceToken: req.params.deviceToken
            }
        })
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}