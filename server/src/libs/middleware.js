import bodyParser from 'body-parser';
import cors from 'cors';

module.exports = app => {


    app.use(bodyParser.json());
    app.use(cors());

    app.set('port', 3000);
    console.log("port setted in:", app.get('port'));

}