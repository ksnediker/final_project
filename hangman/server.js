// =============================
// Requirements
// =============================
var express = require('express');
var	app = express();
var	port = process.env.PORT || 3000;
// var	logger = require('morgan');
// var	mongoose = require('mongoose');
// var	bodyParser = require('body-parser');
// var	cookieParser = require('cookie-parser');


// =============================
// Middleware
// =============================
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));
// app.user(cookieParser());
app.use(express.static('public'));


// =============================
// DB
// =============================
// mongoose.connect('mongodb://localhost/hangman_app');


// =============================
// Models
// =============================
//var Game = require('./models/');









// =============================
// Listener
// =============================

app.listen(port);