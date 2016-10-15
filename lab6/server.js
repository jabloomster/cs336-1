/*

Curl commands I used:

curl --head localhost:3000/request


curl -X PUT localhost:3000/request works with all http methods, and you can add:
-d '{"name":"Josh"}' -H "Content-Type: application/json" to add data to say a post.

When accessed with curl -X POST localhost:3000/request -d '{"Name":"Josh"}' -H "Content-Type:application/json", the server uses req.body.Name to produce 'Josh'.


6.1
a. I don't think there are any methods you can't test using cURL. 
b. I suppose 404 NOT_FOUND is the best for undefined paths.

6.2
a. GET and POST are the only html methods supported by forms
b. Our form has three "widgets" each with a given name, so the server accesses each of the
	three pieces of data by their name like this: req.body.user_email

@author jlm54
@date 10/14/2016

*/


var express = require('express');
var app = express();
var http_status = require('http-status-codes'); //$ npm install http-status-codes --save
var bodyParser = require('body-parser'); //$ npm install body-parser --save

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/request', function (req, res) {
  res.send('Got a get request!');
});

app.head('/request', function (req, res) {
  res.send('Got a head request');
});

app.put('/request', function (req, res) {
	res.send('Got a put request<br>Posted message: <code>'
	+ req.body.Name + '</code>');
});

app.post('/request', function (req, res) {
	res.send('Got a post request<br>Posted message: <code>'
	+ req.body.Name + '</code>');
});

//this post is for the form.html located in /forms
app.post('/forms', function (req, res) {
	res.send('Got a post request from /forms <br>Posted message: <code>'
	+ req.body.user_name + ' @ ' + req.body.user_email + ' says: ' + req.body.user_message + '</code>');
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.all('*', function (req, res) {
  res.sendStatus(http_status.NOT_FOUND);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});