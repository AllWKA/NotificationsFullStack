
import { getUsers, getUser, postUser, updateUser, deleteUser } from "../controllers/users";
module.exports = app => {

    const User = app.db.models.users;

    app.get('/users', (req, res) => getUsers(app, req, res));

    app.get('/user/:email/:applicationName', (req, res) => getUser(app, req, res));

    app.post('/user', (req, res) => postUser(app, req, res));

    app.put("/user/:email/:applicationName", (req, res, next) => updateUser(app, req, res));

    app.delete('/user/:email/:applicationName', (req, res) => deleteUser(app, req, res));

}