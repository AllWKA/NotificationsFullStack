import bodyParser from 'body-parser';
import cors from 'cors';

module.exports = app => {

    //utilidades que usara el servidor

    //sirve para que pueda aceptar peticiones con un body
    app.use(bodyParser.json());

    app.use(cors());

    //establecer el puerto que usara el servidor
    app.set('port', 3000);

    console.log("port setted in:", app.get('port'));

}