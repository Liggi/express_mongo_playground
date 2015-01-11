var express = require("express"),
	bodyParser = require("body-parser"),
	db = require("mongojs").connect("jason-messages", [ "messages" ]);

var app = express();

app.use(bodyParser.urlencoded());

app.get('/', function(req, res, next) {
		res.render('index.ejs');
});

app.route('/messages')
	.get(function(req, res, next) {
		db.collection("messages").find({}, {}, function(err, document) {
			res.render('messages.ejs', { messages: document });
		});
	});

app.route('/message')
	.get(function(req, res, next) {
		res.render('message.ejs');
	})
	.post(function(req, res, next) {
		db.collection("messages").insert({ name: req.body.name, message: req.body.message });
		res.redirect('/');
	});

app.listen(3000);