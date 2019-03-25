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
    app.db.models.applications.find({

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
    const applicationName = req.params.applicationName;
    const applicationNameNew = req.body.applicationName;
    const tokenapplication = req.body.tokenapplication;

    app.db.models.applications.update(
        {
            nameapplication: applicationNameNew,
            tokenapplication: tokenapplication
        },

        { where: { applicationName: applicationName } })

        .then(rowsUpdated => {
            res.json(rowsUpdated);
            for (let index = 0; index < req.body.admins.length; index++) {
                addAdmin(app, req.body.applicationName, req.body.admins[index]);
            }
        })

        .catch(error => { res.status(412).json({ msg: error.message }); });
}

function addAdmin(app, applicationName, adminEmail) {
    app.db.models.applications.find({
        where: { applicationName: applicationName }
    })
        .then(application => {
            app.db.models.admins.find({
                where: { email: adminEmail }
            })
                .then(admin => { application.addAdmin(admin); })
                .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));

}