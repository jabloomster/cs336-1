/* Homework 3
 * @author jlm54
 * @date 11/20/2016
 * 
 * * * * * * * * * * * * * * */

 var fs = require('fs');
 var path = require('path');
 var express = require('express');
 var bodyParser = require('body-parser');
 var app = express();
 var MongoClient = require('mongodb').MongoClient
 var assert = require('assert');

 var db;

 app.set('port', (process.env.PORT || 3000));

 app.use('/', express.static(path.join(__dirname, 'public')));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest people.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//get list of all people from server
app.get('/people', function(req, res) {
	db.collection("people").find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		res.json(docs);
	});
});

//post a new person to the server
app.post('/people', function(req, res) {
	var newPerson = {
		personID: Date.now(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		startDate: req.body.startDate,
	};
	db.collection("people").insertOne(newPerson, function(err,result){
		assert.equal(err, null);
		var newId = result.insertedId;
		db.collection("people").find({_personID: newId}).next(function(err, doc) {
			res.json(doc);
		});
	});
});

//list person with given ID
app.get('/person/:personID', function(req, res) {
	var tempID = parseInt(req.params.personID);
	db.collection("people").findOne({"personID":tempID},function(err, docs) {
		assert.equal(err, null);
		res.json(docs);
	});
});

//Edit person with given ID
app.put('/person/:personID', function(req, res) {
	var tempID = parseInt(req.params.personID);
	db.collection("people").updateOne({"personID":tempID},{
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		startDate: req.body.startDate,
	},
	function(err, result) {
		assert.equal(err, null);
		var newId = result.insertedId;
		db.collection("people").find({_personID: newId}).next(function(err, doc) {
			res.json(doc);
		});
	});
});


//delete person with given ID
app.delete('/person/:personID', function(req, res) {
	var tempID = parseInt(req.params.personID);
	db.collection("people").remove({"personID":tempID},function(err, docs) {
		assert.equal(err, null);
		res.send("Person deleted...permanently.");
	});
});

//list person seniority with given ID
app.get('/person/:personID/years', function(req, res) {
	var tempID = parseInt(req.params.personID);
	db.collection("people").findOne({"personID":tempID},function(err, docs) {
		assert.equal(err, null);
		res.json(calcAge(docs.startDate));
	});
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

//taken from http://jsfiddle.net/codeandcloud/n33RJ/
//Calculates age based on birthdate month/day/year ex 01/01/1990
function calcAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds147797.mlab.com:47797/cs336db';
MongoClient.connect(mongoURL, function(err, dbConnection) {
	if (err) {
		throw err;
	}
    db = dbConnection; //saves the db handle for routers to use
});