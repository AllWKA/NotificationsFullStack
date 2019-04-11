/* Enviar un mensaje a un topico no distinguira entre appliciones*/

module.exports = app => {

    const Messages = app.db.models.messages;

    app.get('/messages', (req, res) => {
        //Done
        Messages.findAll()
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/appsAndMessages', (req, res) => {
        //Done
        Messages.findAll({
            include: [{ model: app.db.models.applications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/notificationsAndMessages', (req, res) => {
        //Done
        Messages.findAll({
            include: [{ model: app.db.models.notifications }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/topicsAndMessages', (req, res) => {
        //Done
        Messages.findAll({
            include: [{ model: app.db.models.topics }]
        })
            .then(result => res.json(result))
            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/message/:id', (req, res) => {
        //Done
        Messages.find({
            where: {
                idMessages: req.params.id
            }
        })
            .then(messages => { res.json(messages); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.get('/messageWithParams/:body/:title/:label/:createdAt', (req, res) => {
        //Done
        Messages.find({
            where: {
                body: req.params.body,
                title: req.params.title,
                label: req.params.label,
                createdAt: req.params.createdAt,
            }
        })
            .then(messages => { res.json(messages); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

    app.get('/messagesFromLabel/:label', (req, res) => {
        //Done
        Messages.findAll({
            where: { label: req.params.label }
        })
            .then(messages => { res.json(messages); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });

    app.get('/messagesFromTitle/:title', (req, res) => {
        //Done
        Messages.findAll({
            where: { title: req.params.title }
        })
            .then(messages => { res.json(messages); })
            .catch(error => { res.status(412).json({ msg: error.message }) });;
    });

    app.post('/message', (req, res) => {
        //Done
        // var a = Messages.build(req.body)
        // console.log(JSON.stringify(a));
        // a.save().then(a=>console.log(JSON.stringify(a)))
        // a.update().then(a=>console.log(JSON.stringify(a)))
        

        Messages.create(req.body)
            .then(app => { 
                res.json(app); 
            })
            .catch(error => { res.status(412).json({ msg: error.message }) });

    });

    app.put("/message/:id", (req, res, next) => {
        //Done
        Messages.update(
            req.body,
            { where: { idMessages: req.params.id } })
            .then(rowsUpdated => { res.json(rowsUpdated); })
            .catch(next);
    });

    app.delete('/message/:id', (req, res) => {
        //Done
        Messages.destroy(
            { where: { idMessages: req.params.id } })
            .then(app => { res.json(app); })
            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}