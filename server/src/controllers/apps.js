module.exports.getAllApps = (app, req, res) => {
    app.db.models.applications.findAll()
        .then(result => res.json(result))
        .catch(error => { res.status(412).json({ msg: error.message }); });
}
module.exports.appsAndUsers = (app, req, res) => {
    app.db.models.applications.findAll({
        include: [{ model: app.db.models.users }]
    })
        .then(result => res.json(result))
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.getApp = (app, req, res) => {
    app.db.models.applications.findOne({
        where: { applicationName: req.params.applicationName }
    })
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.usersFromApp = (app, req, res) => {
    app.db.models.applications.find({
        include: [{ model: app.db.models.users }],
        where: { applicationName: req.params.applicationName }
    })
        .then(app => { app.getUsers().then(users => { res.json(users); }); })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.createApp = (app, req, res) => {
    app.db.models.applications.create(req.body)
        .then(application => {
            addAdmin(app, application.dataValues.applicationName, 'root@gmail.com');
            res.json(app);
        })
        .catch(error => { res.status(412).json({ msg: error.message }) });
}

module.exports.updateApp = (app, req, res) => {
    app.db.models.applications.update(
        {
            nameapplication: req.body.applicationName,
            tokenapplication: req.body.tokenapplication
        },
        { where: { applicationName: req.params.applicationName } })

        .then(rowsUpdated => {
            res.json(rowsUpdated);
            //will add all the admins inside admin array in req
            for (let index = 0; index < req.body.admins.length; index++) {
                addAdmin(app, req.body.applicationName, req.body.admins[index]);
            }
        })

        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.deleteApp = (app, req, res) => {
    app.db.models.applications.destroy(
        { where: { applicationName: req.params.applicationName } })
        .then(app => { res.json(app); })
        .catch(error => { res.status(412).json({ msg: error.message }); });
}

module.exports.addAdmins = (app, req, res) => {
    var promesa = new Promise(function (resolve, reject) {
        var sucsess = 0;
        for (let index = 0; index < req.body.admins.length; index++) {
            if (addAdmin(app, req.params.applicationName, req.body.admins[index]) == true) {
                sucsess++;
            }
        }
        resolve(sucsess);
    })
    promesa.then(function (resultado) {
        res.json("hecho");
    })
}

function addAdmin(app, applicationName, adminEmail) {
    //will find the application with the name in params
    app.db.models.applications.find({
        where: { applicationName: applicationName }
    })
        .then(application => {
            app.db.models.admins.find({
                where: { email: adminEmail }
            })
                .then(admin => {
                    application.addAdmin(admin);
                    return true;
                })
                .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
}
