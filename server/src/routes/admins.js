var bcrypt = require('bcryptjs');

module.exports = app => {

    const Admin = app.db.models.admins;

    app.get('/admins', (req, res) => {

        Admin.findAll({
            // include: [{ model: app.db.models.app }]
        })
            .then(result => { res.json(result); })

            .catch(error => { res.status(412).json({ msg: error.message }); });

    });
    app.post('/admin', (req, res) => {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                const userName = req.body.userName;
                const email = req.body.email;
                const password = hash;
                const discriminator = req.body.discriminator;

                Admin.create({

                    userName: userName,
                    email: email,
                    discriminator: discriminator,
                    password: password
                })
                    .then(user => { res.json(user); })

                    .catch(error => { res.status(412).json({ msg: error.message }); });
            });
        });


    });
    app.put("/admin/:id", (req, res, next) => {
        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(req.body.password, salt, (err, hash) => {

                const idAdmin = req.params.id;
                const userName = req.body.userName;
                const email = req.body.email;
                const password = hash;
                const discriminator = req.body.discriminator;

                Admin.update({

                    userName: userName,
                    email: email,
                    discriminator: discriminator,
                    password: password

                }, { where: { idAdmin: idAdmin } })

                    .then(rowsUpdated => { res.json(rowsUpdated); })

                    .catch(error => { res.status(412).json({ msg: error.message }); });
            });
        });

    });
    app.delete('/admin/:id', (req, res) => {

        const idAdmin = req.params.id;

        Admin.destroy({ where: { idAdmin: idAdmin } })

            .then(deletedAdmin => { res.json(deletedAdmin); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });
    app.get('/logAdmin/:name/:pwd', (req, res) => {

        const userName = req.params.name;
        const password = req.params.pwd;
        const nextRes = res;

        User.find({
            // include: [{

            //     model: app.db.models.app,
            //     attributes: ['id', 'name']
            // }],

            where: {
                userName: userName
            }
        })
            .then(user => {
                // bcrypt.compare(password, user.password, (err, res) => {

                //     if (res) {
                //         nextRes.json(user);
                //     } else {
                //         nextRes.json(err);
                //     }
                // });
                console.log(user);


            }).catch(error => {

                res.status(412).json({ msg: error.message })
            });
    });


}