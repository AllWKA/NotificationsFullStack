module.exports.tokenNotificationFromUser = (app, req, res) => {
    getApplication(app, req).then(application => {
        getUser(app, req).then(user => {
            app.db.models.tokennotifications.findAll({
                where: {
                    userID: user.idUser,
                    applicationID: application.idApplication
                },
                order: ['createdAt']
            }).then(tokenNotifications => {
                console.log("---->", JSON.stringify(tokenNotifications));
                res.json(tokenNotifications);
            })
                .catch(error => { res.status(412).json({ msg: error.message }); });
        })
    })

}

function getUser(app, req) {
    return new Promise((resolve, reject) => {
        //codigo dentro de la promesa, consulta a la bd
        app.db.models.users.find({
            include: [{ model: app.db.models.applications, as: 'devices' }],
            where: {
                email: req.params.email,
                applicationName: req.params.applicationName
            }
        })
            .then(user => { resolve(user); })
            .catch(error => { reject(error.message); });
    })
}


module.exports.tokenNotificationFromApplicationSuccess = (app, req, res) => {
    //llamo a la funcion y le paso parametros
    getApplication(app, req).then(application => {
        //cuando termine la promesa ejecuto la segunda consulta
        app.db.models.tokennotifications.findAll({
            where: {
                applicationID: application.idApplication,
                success: 1
            }
        }).then(applications => res.json(applications))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}
module.exports.tokenNotificationFromApplicationFailed = (app, req, res) => {
    //llamo a la funcion y le paso parametros
    getApplication(app, req).then(application => {
        //cuando termine la promesa ejecuto la segunda consulta
        app.db.models.tokennotifications.findAll({
            where: {
                applicationID: application.idApplication,
                success: 0
            }
        }).then(applications => res.json(applications))
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}
function getApplication(app, req) {
    //creo una promesa
    return new Promise((resolve, reject) => {
        //codigo dentro de la promesa, consulta a la bd
        app.db.models.applications.findOne({
            where: { applicationName: req.params.applicationName }
        })  //resolve para exito
            .then(app => { resolve(app); })
            //reject para fail
            .catch(error => { reject(error.message); });
    })
};