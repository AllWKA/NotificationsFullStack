import { getDevices, devicesFroAplication, devicesFromUser, createDevice, updateDevice, deleteDevice } from "../controllers/deviceTokens";
module.exports = app => {

    const DeviceTokens = app.db.models.devicetokens;

    app.get('/deviceTokens', (req, res) => getDevices(app, req, res));
    app.get('/devicesFromApplication/:applicationID', (req, res) => devicesFroAplication(app, req, res));
    app.get('/devicesFromUser/:userID', (req, res) => devicesFromUser(app, req, res));
    app.post('/deviceTokens', (req, res) => createDevice(app, req, res));
    app.put('/deviceTokens/:userID/:applicationID/:deviceToken', (req, res) => updateDevice(app, req, res));
    app.delete('/deviceTokens/:userID/:applicationID/:deviceToken', (req, res) => deleteDevice(app, req, res));
};