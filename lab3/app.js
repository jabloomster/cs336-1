/**
 * Lab 3
 * a simple web server
 *
 * @author jlm54 
 * 9/21/2016
 */
var os = require("os");
var express = require('express');
var app = express();

app.get('/hey', function (req, res) {
  res.send('Hello World! I am a simple web page!');
});

app.use('/static', express.static('public'));


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});


console.log("Hello from app.js! Host name is: " + os.hostname() + ".");