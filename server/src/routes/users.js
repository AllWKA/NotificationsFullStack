var bcrypt = require('bcryptjs');

module.exports = app => {

    const User = app.db.models.users;

    app.get('/users', (req, res) => {

        User.findAll({
            // include: [{ model: app.db.models.app }]
        })
            .then(result => { res.json(result); })

            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/user/:idUser', (req, res) => {

        const idUser = req.params.idUser;

        User.find({ where: { idUser: idUser } })

            .then(owner => { res.json(owner); });
    });

    app.get('/logUser/:name/:pwd', (req, res) => {

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

    app.post('/user', (req, res) => {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                const userName = req.body.userName;
                const email = req.body.email;
                const password = hash;

                User.create({

                    userName: userName,
                    email: email,
                    password: password
                })
                    .then(user => { res.json(user); })

                    .catch(error => { res.status(412).json({ msg: error.message }); });
            });
        });


    });

    app.put("/user/:id", (req, res, next) => {
        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(req.body.pwd, salt, (err, hash) => {

                const id = req.params.id;
                const name = req.body.name;
                const email = req.body.email;
                const pwd = hash;
                const status = req.body.status;

                User.update({

                    name: name,
                    email: email,
                    status: status,
                    pwd: pwd

                }, { where: { id: id } })

                    .then(rowsUpdated => { res.json(rowsUpdated); })

                    .catch(error => { res.status(412).json({ msg: error.message }); });
            });
        });

    });

    app.delete('/user/:id', (req, res) => {

        const id = req.params.id;

        User.destroy({ where: { id: id } })

            .then(deletedOwner => { res.json(deletedOwner); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}