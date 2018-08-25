// base modules
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

// load environment
require("./env.js");

// get environment
const ENV = JSON.parse(process.env.ENV);

// aditional modules
const morgan = require("morgan");
const bodyParser = require('body-parser');

// components
const router = require("./app/router");


// ------------ create connection mongodb ------------
mongoose.connect(ENV.path_mongodb, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// ------------ build app ------------

// log requests
app.use(morgan('tiny'));

// parser payload
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config for CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE');
    res.setHeader('Allow', 'GET, POST, PATCH, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

// lead constants
app.use((req, res, next) => {
    req.db = db;
    return next();
});

// load routes
router(app);

// ------------ start app ------------

http.listen(ENV.port,function(){
    console.log('Server start on port: '+ENV.port);
});