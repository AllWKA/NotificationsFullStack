var babel = require("@babel/core");

import express from 'express';
import consign from 'consign';

const app = express();

consign({
    cwd: __dirname
})
    .include('libs/config.js')//primero se carga la configuracion
    .then('db.js')//segundo se inicia la conexion de sequelize
    .then('libs/middleware.js')//se inician las utilidades de la api
    .then('routes')// se cargan las rutas
    .then('libs/boot.js')// se arranca el servidor
    .into(app);