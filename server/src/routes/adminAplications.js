module.exports = app => {

    const adminAplications = app.db.models.adminAplications;

    app.get('/adminAplications', (req, res) => {

        adminAplications.findAll()

            .then(result => { res.json(result); })

            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    app.get('/adminAplications/:adminID', (req, res) => {

        const adminID = req.params.adminID;

        adminAplications.findAll({
            where: { adminID: adminID }
        })
            .then(admin => { res.json(admin); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });
    app.post('/adminAplications', (req, res) => {

        const adminID = req.body.adminID;
        const aplicationID = req.body.aplicationID;

        adminAplications.create(req.body)
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.put('/adminAplications/:adminID/:aplicationID', (req, res) => {

        const adminID = req.body.adminID;
        const aplicationID = req.body.aplicationID;

        adminAplications.update(
            req.body,
            {
                where: {
                    adminID: req.params.adminID,
                    aplicationID: req.params.aplicationID
                }
            }
        )
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });
    app.delete('/adminAplications/:adminID/:aplicationID', (req, res) => {

        const idAplication = req.params.id;

        adminAplications.destroy(
            {
                where: {
                    adminID: req.params.adminID,
                    aplicationID: req.params.aplicationID
                }
            })

            .then(app => { res.json(app); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}