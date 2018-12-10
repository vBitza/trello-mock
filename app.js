const express = require('express');
const db = require('./mock-db/db');
const bodyParser = require('body-parser')
const hostname = '127.0.0.1';

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


routes(app);


app.use(express.static(__dirname + '/http-static'));


module.exports = app;
