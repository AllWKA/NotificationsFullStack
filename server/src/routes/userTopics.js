import {
    getUserTopics,
    getTopicsFromUser,
    postUserTopic,
    deleteUsersTopic
} from "../controllers/userTopics";
module.exports = app => {

    const User = app.db.models.users;

    app.get('/userTopics', (req, res) => getUserTopics(app, req, res));

    app.get('/userTopics/:userID/:applicationID', (req, res) => getTopicsFromUser(app, req, res));

    app.post('/userTopics', (req, res) => postUserTopic(app, req, res));

    // app.put("/userTopics/:email/:applicationName", (req, res, next) => updateUser(app, req, res));

    app.delete('/userTopics/:userID/:applicationID/:topicID', (req, res) => deleteUsersTopic(app, req, res));

}