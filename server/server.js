//Express server
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var db             = require('./config/db');
//var schemas        = require('./config/schemas');

//Connect when ready
//require('./config/socketRoutes.js')(app);

var port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);            
console.log('Server listening on port ' + port);
   
exports = module.exports = app; 