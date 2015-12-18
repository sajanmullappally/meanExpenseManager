
// load node modules =========================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compass = require('node-compass');

// database connection =======================================================

var db = require('./config/db');

// parse application/json ====================================================

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// set root ==================================================================

app.use(express.static(__dirname + "/public"));

// configure node-compass ====================================================

var env = process.env.NODE_ENV || 'compass';
if ('compass' == env) {
  app.use(compass());
}

// start app =================================================================

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:'+port);
});