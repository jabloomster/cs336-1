/* Homework 1
 * @author jlm54
 * @date 10/4/2016
 * 
 * Server for serving up peoples at specific urls 
 * as jsons 
 *
 * * * * * * * * * * * * * * */



/////////////   Person Database   /////////////////////

//this global variable keeps track of the last ID used
var uniqueID = 0;

//this function returns a unique ID
function getUniqueID(){
	uniqueID++;
	return uniqueID - 1;
}

//People global object contains Person(s)
peopleList = [];

//Person object
function Person(firstName, lastName, startDate) {
	this.firstName=firstName;
	this.lastName=lastName;
	this.id=getUniqueID();
	this.startDate=startDate;
	peopleList.push(this);
}

//list of all people
function listPeople(){
	
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
var p1 = new Person('Herman', 'Whearr', "7/14/1989");
var p2 = new Person('Jay', 'Mags', "5/2/1994");
var p3 = new Person('Mad', 'D', '3/2/1996');
var p4 = new Person('Mario', 'Super', '1/1/1884');

console.log(p1);
console.log(p2);
console.log(p3);
console.log(p4);


///////////    Server stuff   /////////////////

var express = require('express');
var app = express();

//note the order of all these app.gets is important, especially /person/id/ name or years?

app.get('/', function(req, res) {
	res.send('Welcome to the People Server!');
});

//url to list all people objects as json object
app.get('/people', function (req, res) {
	res.json(peopleList);
	console.log('People List accessed via people url!');
});

//url to list record of a person with a given ID number
app.get('/person/:id', function(req,res){
	//search through people for person with matching id to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(peopleList[i]);
			console.log('Person at id '+req.params.id+' accessed via id url!');
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
			console.log('Person year at id '+req.params.id+' accessed via id/year url!');
			return;
		}
	}
	res.sendStatus(404);	
});

// url to full name of person of a given ID and first name
app.get('/person/:id/:name', function(req,res){
	//search through people for person with matching id and first name to res.params
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id && peopleList[i].firstName == req.params.name) {
			res.json(peopleList[i].firstName + ' ' + peopleList[i].lastName);
			console.log('Person at id '+req.params.id+' accessed via id/firstName url!');
			return;
		}
	}
	res.sendStatus(404);
});


app.listen(3000, function (){
	console.log('index.js listening in port 3000')
});