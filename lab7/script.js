"use strict"


var express = require('express');
var app = express();
app.use(express.static('public'));
// var http_status = require('http-status-codes');


app.get('/', function (req, res) {
  res.send('Lab7');
});

app.get('/fetch', function (req, res) {
  res.json({Message:"Hello, " + req.query.name + "! I'm a data!"});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

