/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var app = express();

app.set('port', (process.env.PORT || 3000));
var APP_PATH = path.join(__dirname, 'dist');

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect to MongoDB
var db;
var PASSWORD = 'bjarne';
var mongoURL = 'mongodb://cs336:' + PASSWORD + '@ds139937.mlab.com:39937/cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
	if (err) throw err;
	db = dbConnection;
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/timeslots', function(req, res) {
	db.collection('timeslots').find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

app.post('/api/timeslots', function(req, res) {
    var newTimeSlot = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
    };
	db.collection('timeslots').insertOne(newComment, function(err, result) {
		if (err) throw err;
		db.collection('timeslots').find({}).toArray(function(err, docs) {
			if (err) throw err;
			res.json(docs);
		});
	});

});

app.get('/api/timeslots/:id', function(req, res) {
    db.collection("timeslots").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/timeslots', function(req, res) {
    var update = req.body;

    db.collection('timeslots').updateOne(
        { id: update.id },
        { $set: {
			name: update.name,
			email: update.email,
			filled: true,
		}},
        function(err, result) {
            if (err) throw err;
            db.collection("timeslots").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/timeslots/:id', function(req, res) {
    db.collection("timeslots").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("timeslots").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
