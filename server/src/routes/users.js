var bcrypt = require('bcryptjs');

module.exports = app => {

    const User = app.db.models.users;

    app.get('/users', (req, res) => {

        User.findAll({
            include: [{ model: app.db.models.aplications, as: 'devices' }]
        })
            .then(result => { res.json(result); })

            .catch(error => { res.status(412).json({ msg: error.message }); });

    });

    app.get('/user/:idUser', (req, res) => {

        const idUser = req.params.idUser;

        User.find({
            include: [{ model: app.db.models.aplications, as: 'devices' }],
            where: { idUser: idUser }
        })

            .then(owner => { res.json(owner); });
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

            bcrypt.hash(req.body.password, salt, (err, hash) => {

                const idUser = req.params.id;
                const userName = req.body.userName;
                const email = req.body.email;
                const password = hash;

                User.update({

                    userName: userName,
                    email: email,
                    password: password

                }, { where: { idUser: idUser } })

                    .then(rowsUpdated => { res.json(rowsUpdated); })

                    .catch(error => { res.status(412).json({ msg: error.message }); });
            });
        });

    });

    app.delete('/user/:id', (req, res) => {

        const idUser = req.params.id;

        User.destroy({ where: { idUser: idUser } })

            .then(deletedOwner => { res.json(deletedOwner); })

            .catch(error => { res.status(412).json({ msg: error.message }); });
    });

}