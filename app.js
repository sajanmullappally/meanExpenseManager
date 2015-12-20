
// load node modules =========================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// database connection =======================================================

var db = require('./config/db');

// parse application/json ====================================================

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method
		delete req.body._method
		return method
	}
}));

// set root ==================================================================

app.use(express.static('public'));

// Express Routing ===========================================================

var accountRoute = require('./routes/account-routes.js')
app.use('/api', accountRoute);

// start app =================================================================

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:'+port);
});

module.exports = app;