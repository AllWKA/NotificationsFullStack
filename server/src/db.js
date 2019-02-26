import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let db = null;

module.exports = app => {
    //importo la configuracion
    const config = app.libs.config;

    //en el caso de que la conexion con la base de datos
    //no haya sido realizada se inicia.
    if (!db) {
        //se crea una nueva instancia de sequelize con la configuracion de la base de datos
        //para que se pueda conectar a ella.
        const sequelize = new Sequelize(

            config.database,
            config.username,
            config.password,
            config.params
        );
        // Variable que recoge todo lo relacionado con sequelize
        db = {
            //instancia de sequelize
            sequelize,
            //la librería de sequelize
            Sequelize,
            //los modelos que se usaran para mapear la base de datos
            models: {}
        };
        //se crea una constante para el path del archivo de models
        // la libreria path funciona para concatenar rutas
        // sea el s.o que sea
        const dir = path.join(__dirname, 'models');

        fs.readdirSync(dir).forEach(filename => {

            console.log("---------------->Adding model: ", filename);
            const modelDir = path.join(dir, filename);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
            console.log("done");

        });
        
        console.log("All Models charged:", db.models);

        Object.keys(db.models).forEach(key => {
            console.log("****************assosiating: ", db.models[key].name);
            db.models[key].associate(db.models);
        });

    }
    return db;

}