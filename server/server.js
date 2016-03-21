var http = require('./config/routes.js');

var port = process.env.PORT || 3000;
http.listen(port);
console.log('Server listening on port ' + port);

// These modules populates the db:

// UNCOMMENT THESE NEXT THREE TO POPULATE YOUR DATABASE, THEN COMMENT IT OUT AGAIN:

// var populateEstablishements = require('./establishments/populateEstablishments');
// var populateUsers           = require('./users/populateUsers');
// var populateVotes           = require('./votes/populateVotes');



