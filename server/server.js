//Express server
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
//var models         = require('./config/db');

//Connect when ready
//require('./config/socketRoutes.js')(app);

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);
console.log('Server listening on port ' + port);

// This module populates establishment data.
// Uncomment code in populateEstablishments to upload data to the database
var populateEstablishements = require('./establishments/populateEstablishments');
var populateUsers = require('./users/populateUsers');
var populateVotes = require('./votes/populateVotes');


exports = module.exports = app;
