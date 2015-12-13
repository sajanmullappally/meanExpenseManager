
// load node modules =========================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// database connection =======================================================

mongoose.connect('mongodb://localhost/meanExpenseManager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("successful database connection");
});

// parse application/json ====================================================

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// set root ==================================================================

app.use(express.static(__dirname + "/public"));

// start app =================================================================

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:'+port);
});