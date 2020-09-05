const functions = require('firebase-functions');

const express = require('express');
//const expressLayout = require('express-ejs-layouts');

const app = express();


//EJS
//app.use(expressLayout);
app.set('views','./views');
app.set('view engine', 'ejs');
app.set('images','../public');
app.use(express.static("images"));
app.set('css','../public');
app.use(express.static("css"));


//BodyParser
app.use(express.urlencoded({ extended: false }))


//Routes
app.use('/', require('./indexRoutes'));
app.use('/users', require('./users'));
app.use('/DataRetrieval', require('./DataRetrieval'));

exports.app = functions.https.onRequest(app);
