module.exports = app => {

    const adminAplications = app.db.models.adminAplications;

    app.get('/adminAplications', (req, res) => {

        adminAplications.findAll()

            .then(result => { res.json(result); })

            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

}