var http = require('./config/routes.js');

var port = process.env.PORT || 3000;

http.listen(port);
console.log('Server listening on port ' + port);

// These modules populates the db:

// UNCOMMENT THESE NEXT THREE TO POPULATE YOUR DATABASE, THEN COMMENT IT OUT AGAIN:

// Uncomment and re-comment in this order:
// 1) populateEstablishements
// 2) populateUsers

var populateEstablishements = require('./populateData/populateEstablishments');
// var populateUsers           = require('./populateData/populateUsers');
 
//This function will generate new votes if previous votes are > 24 hours old
 var populateVotes           = require('./populateData/populateVotes');

 module.exports = http;



