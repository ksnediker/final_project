// =============================
// Requirements
// =============================
var express = require('express');
var	app = express();
var	port = process.env.PORT || 3000;
var	logger = require('morgan');
var	mongoose = require('mongoose');
var	bodyParser = require('body-parser');
var	cookieParser = require('cookie-parser');
var md5 = require('md5');


// =============================
// Middleware
// =============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static('public'));


// =============================
// DB
// =============================
mongoose.connect('mongodb://localhost/hangman_app');


// =============================
// Models
// =============================
var User = require('./models/user');


// =============================
// Post user sign up
// =============================

app.post('/signup', function(req, res) {
	console.log(req.body);
	var user = new User(req.body);
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	wins: req.body.wins,
	// 	loses: req.body.loses
	// });

	// console.log(user);
	// console.log(user.id);

	user.save(function(err) {
		if (err) {
			console.log(err);
			res.statusCode = 503;
		} else {
			res.cookie("loggedinID", user.id);
			console.log(user);
			res.redirect("/");
		}
	});
});


// ==========================
// Post user log in
// ==========================

app.post('/login', function(req, res) {
	User.findOne({'email': req.body.email}, function(err, user) {
		if(err) {
			console.log("err: ", err);
			res.send("error");
			return;
		}
		if(user != null && req.body.password == user.password) {
			res.cookie("loggedinID", user.id);
		}
		res.redirect("/");
		console.log("this is a user: ", user);
		console.log("this is req.body: ", req.body);
	});
});


// ==========================
// Put user wins and loses
// ==========================

app.put('/users/:id', function(req, res) {
	console.log(req.body);
	User.findOneAndUpdate( {_id: req.params.id}, req.body, function(err, user) {
		res.send(user);
	// User.findOneAndUpdate({'wins': req.body.wins}, function(err, user) {
	// 	if(err) {
	// 		console.log("error is: ", err);
	// 		res.send("error");
	// 		return;
	// 	}
	});
});


// ==========================
// Get user data
// ==========================

app.get('/users', function(req, res) {
	User.find().then(function(result) {
		res.send(result);
	})
})






// =============================
// Listener
// =============================

app.listen(port);