module.exports.getUserTopics = (app, req, res) => {
    app.db.models.usertopics.findAll()
        .then(user => { res.json(user); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.getTopicsFromUser = (app, req, res) => {
    app.db.models.usertopics.findAll({
        where: {
            userID: req.params.userID,
            applicationID: req.params.applicationID
        }
    })
        .then(user => { res.json(user); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.postUserTopic = (app, req, res) => {
    app.db.models.usertopics.create(req.body)
        .then(resp => res.json(resp))
        .catch(error => res.status(412).json({ msg: error.message }))
}

module.exports.deleteUsersTopic = (app, req, res) => {
    app.db.models.usertopics.destroy({
        where: req.params
    })
        .then(resp => res.json(resp))
        .catch(error => res.status(412).json({ msg: error.message }))
}