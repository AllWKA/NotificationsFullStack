var bcrypt = require('bcryptjs');
module.exports.getUsers = (app, req, res) => {
    app.db.models.users.findAll({
        include: [{ model: app.db.models.applications, as: 'devices' }]
    })
        .then(result => { res.json(result); })
        .catch(error => { res.status(412).json({ msg: error.message }); });

}

module.exports.getUser = (app, req, res) => {
    app.db.models.users.find({
        include: [{ model: app.db.models.applications, as: 'devices' }],
        where: { idUser: req.params.idUser }
    })
        .then(owner => { res.json(owner); })
        .catch(error => { res.status(412).json({ msg: error.message }); });

}

module.exports.postUser = (app, req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            app.db.models.users.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hash
            })
                .then(user => { res.json(user); })
                .catch(error => { res.status(412).json({ msg: error.message }); });
        });
    });
}

module.exports.updateUser = (app, req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            app.db.models.users.update({
                userName: req.body.userName,
                email: req.body.email,
                password: hash
            }, { where: { idUser: req.params.id } })
                .then(rowsUpdated => { res.json(rowsUpdated); })
                .catch(error => { res.status(412).json({ msg: error.message }); });
        });
    });
}

module.exports.deleteUser = (app, req, res) => {
    app.db.models.users.destroy({
        where: { idUser: req.params.id }
    })
        .then(deletedOwner => { res.json(deletedOwner); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}
