import { getAllAdmins, getAdmin, appsFromAdmin, postAdmin, putAdmin, deleteAdmin, addApplication } from "../controllers/admins";

module.exports = app => {

    const Admin = app.db.models.admins;


    app.post('/addApplication/:email/:applicationName', (req, res) => addApplication(app, req, res));

    app.get('/admin/:email', (req, res) => getAdmin(app, req, res));

    app.get('/admins', (req, res) => getAllAdmins(app, req, res));

    app.get('/appsFromAdmin/:email', (req, res) => appsFromAdmin(app, req, res));

    app.get('/messagesFromAdmin/:email', (req, res) => messagesFromAdmin(app, req, res));

    app.post('/admin', (req, res) => postAdmin(app, req, res));

    app.put("/admin/:email", (req, res, next) => putAdmin(app, req, res));

    app.delete('/admin/:email', (req, res) => deleteAdmin(app, req, res));

}