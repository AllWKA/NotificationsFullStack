var bcrypt = require('bcryptjs');

module.exports.getAllAdmins = (app, req, res) => {

    app.db.models.admins.findAll()
        .then(result => { res.json(result); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
};

module.exports.getAdmin = (app, req, res) => {
    app.db.models.admins.find({
        where: { email: req.params.email }
    })
        .then(admin => { res.json(admin); })
        .catch(error => { res.status(412).json({ msg: error.message }) });

};

module.exports.appsFromAdmin = (app, req, res) => {
    app.db.models.admins.find({
        include: [{ model: app.db.models.applications }],
        where: { email: req.params.email }
    })
        .then(admin => { res.json(admin); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.messagesFromAdmin = (app, req, res) => {
    app.db.models.admins.find({
        //incluye en el json que se devuelve las applicaciones que controla ese administrador
        include: [{ model: app.db.models.messages }],
        where: { email: req.params.email }
    })
        .then(admin => { res.json(admin); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.postAdmin = (app, req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            app.db.models.admins.create({
                userName: req.body.userName,
                email: req.body.email,
                discriminator: req.body.discriminator,
                password: hash
            })
                .then(admin => {
                    addApplication(admin, app, req.body.applicationName, req.body.email);
                    res.json(admin);
                })
                .catch(error => { res.status(412).json({ msg: error.message }); });
        });
    });
}

module.exports.putAdmin = (app, req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            const userName = req.body.userName;
            const email = req.params.email;
            const password = hash;
            const discriminator = req.body.discriminator;
            app.db.models.admins.update(
                {
                    userName: userName,
                    email: email,
                    discriminator: discriminator,
                    password: password

                }, { where: { email: email } })
                .then(rowsUpdated => { res.json(rowsUpdated); })
                .catch(error => { res.status(412).json({ msg: error.message }); });
        });
    });
}

module.exports.deleteAdmin = (app, req, res) => {
    app.db.models.admins.destroy({ where: { email: req.params.email } })

        .then(deletedAdmin => { res.json(deletedAdmin); })

        .catch(error => { res.status(412).json({ msg: error.message }); });

}

module.exports.addApplication = (app, req, res) => {
    app.db.models.admins.find({
        where: { email: req.params.email }
    })
        .then(admin => {
            addApplication(admin, app, req.body.applicationName);
            res.json(admin);
        })
        .catch(error => { res.status(412).json({ msg: error.message }) });

};

//actualiza las apps del usuario (email) pasado por parametros
function addApplication(admin, app, applicationName) {
    app.db.models.applications.find({
        where: { applicationName: applicationName }
    })
        .then(appToAdd => {
            app.db.models.admins.find({
                where: { email: admin.dataValues.email }
            })
                .then(admin => { admin.addApplications([appToAdd]); })
                .catch(error => { res.status(412).json({ msg: error.message }) });
        })
        .catch(error => console.log(error.message));
}

