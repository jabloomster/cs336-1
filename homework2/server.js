/* Homework 2
 * @author jlm54
 * @date 11/3/2016
 * 
 * Server for serving up peoples at specific urls 
 * as jsons (mostly)
 *
 * * * * * * * * * * * * * * */



/////////////   Person Database   /////////////////////

//this global variable keeps track of the last ID used
var uniqueID = 0;

//People global object contains Person(s)
peopleList = [];

//this function returns a unique ID
function getUniqueID(){
	uniqueID++;
	return uniqueID - 1;
}

//Person object
function Person(firstName, lastName, sDate) {
	this.firstName=firstName;
	this.lastName=lastName;
	this.id=getUniqueID();
	this.startDate=sDate;
}

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

//Hard coded Data
peopleList.push(new Person('Herman', 'Whearr', "7/14/1989"));
peopleList.push(new Person('Jay', 'Mags', "5/2/1994"));
peopleList.push(new Person('Mad', 'D', '3/2/1996'));
peopleList.push(new Person('Mario', 'Super', '1/1/1884'));


///////////    Server stuff   /////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http_status = require('http-status-codes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for req.body... and in ajax form.serialize()
app.use(express.static('public'));

//note the order of all these app.gets is important, especially /person/id/ name or years?

app.get('/', function(req, res) {
	res.send('Welcome to the People Server!' + '</br>' +
		'Directories:'  + '</br>' +
		'/people' + '</br>' +
		'/person/id' + '</br>' +
		'/person/id/years' + '</br>' +
		'/person/id/name' + '</br>' +
		'/getpersonform.html' + '</br>' +
		'/newpersonform.html');
});

//url to list all people objects as json object
app.get('/people', function (req, res) {
	res.json(peopleList);
	console.log('People List accessed via people url!');
});

//url to create new person (can also use /newperson)
app.post('/people', function (req, res) {
	peopleList.push(new Person(req.body.firstName, req.body.lastName, req.body.startdate));
	res.json(peopleList[peopleList.length-1]);
	console.log("Person created through /people.");	
});

//url to post new person with given name and start date
app.post('/newperson', function(req, res) {
	peopleList.push(new Person(req.body.firstName, req.body.lastName, req.body.startDate));
	res.json(peopleList[peopleList.length-1]);
	console.log("Person created through /newperson.");
});


//url to list record of a person with a given ID number
app.get('/person/:id', function(req,res){
	//search through people for person with matching id to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(peopleList[i]);
			console.log('Person at id '+req.params.id+' accessed through /person/:id get!');
			return;
		}
	}
	res.sendStatus(404);
});

//url edit info of person with given ID
app.put('/person/:id', function(req,res){
	//search through people for person with matching id to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			//update info
			peopleList[i].firstName=req.body.firstName;
			peopleList[i].lastName=req.body.lastName;
			peopleList[i].startDate=req.body.startDate;
			res.json(peopleList[i]);
			console.log('Person at id '+req.params.id+' edited through /person/:id put!');
			return;
		}
	}
	res.sendStatus(404);
});

//url delete person with given ID
app.delete('/person/:id', function(req,res){
	//search through people for person with matching id to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			//Delete them
			peopleList.splice(i,i+1);
			console.log('Person at id '+req.params.id+' deleted through /person/:id delete!');
			res.send("Person deleted...permanently.");
			return;
		}
	}
	res.sendStatus(404);
});

//url to seniority of a person of given ID
app.get('/person/:id/years', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(calcAge(peopleList[i].startDate));
			console.log('Person year at id '+req.params.id+' accessed through person/id/year!');
			return;
		}
	}
	res.sendStatus(404);	
});

// url to full name of person of a given ID and first name
app.get('/person/:id/name', function(req,res){
	//search through people for person with matching id and first name to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(peopleList[i].firstName + ' ' + peopleList[i].lastName);
			console.log('Person at id '+req.params.id+' accessed via person/:id/name!');
			return;
		}
	}
	res.sendStatus(404);
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

app.listen(3000, function (){
	console.log('index.js listening in port 3000')
});