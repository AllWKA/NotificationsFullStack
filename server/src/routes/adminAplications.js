module.exports = app => {

    const adminapplications = app.db.models.adminapplications;

    app.get('/adminApplications', (req, res) => {
        adminapplications.findAll()
            .then(result => { res.json(result); })
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    //Devuelve todas las applicaiones dado un administrador
    app.get('/adminsFromApplications/:adminID', (req, res) => {
        adminapplications.findAll({
            where: { adminID: req.params.adminID }
        })
            .then(admin => { res.json(admin); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.post('/adminApplications', (req, res) => {
        adminapplications.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.put('/adminApplications/:adminID/:applicationID', (req, res) => {
        adminapplications.update(
            req.body,
            {
                where: {
                    adminID: req.params.adminID,
                    applicationID: req.params.applicationID
                }
            }
        )
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.delete('/adminApplications/:adminID/:applicationID', (req, res) => {
        adminapplications.destroy(
            {
                where: {
                    adminID: req.params.adminID,
                    applicationID: req.params.applicationID
                }
            })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}