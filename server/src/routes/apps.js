module.exports = app => {

    const Apps = app.db.models.aplications;

    app.get('/appsAndUsers', (req, res) => {

        Apps.findAll({
            include: [{ model: app.db.models.user }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/apps', (req, res) => {

        Apps.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/usersFromApp/:id', (req, res) => {

        const id = req.params.id;

        Apps.find({
            include: [{
                model: app.db.models.user,
                attributes: ['id', 'name']

            }],
            where: { id: id }
        })
            .then(app => { app.getUsers().then(users => { res.json(users); }); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });

    app.post('/app', (req, res) => {

        const name = req.body.name;
        const productOwnerId = req.body.productOwnerId;

        Apps.create({

            name: name,
            productOwnerId: productOwnerId
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });

    app.get('/app/:id', (req, res) => {

        const id = req.params.id;

        Apps.find({

            where: { id: id }
        })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.put("/app/:id", (req, res, next) => {

        const id = req.params.id;
        const name = req.body.name;

        Apps.update(
            { name: name },

            { where: { id: id } })

            .then(rowsUpdated => { res.json(rowsUpdated); })

            .catch(next);
    });

    app.delete('/app/:id', (req, res) => {

        const id = req.params.id;

        Apps.destroy(

            { where: { id: id } })

            .then(app => { res.json(app); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}