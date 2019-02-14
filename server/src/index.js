var babel = require("@babel/core");

import express from 'express';
import consign from 'consign';

const app = express();




consign({
    cwd: __dirname
})
    .include('libs/config.js')
    .then('db.js')
    .then('libs/middleware.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);