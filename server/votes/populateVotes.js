// VOTE POPULATOR

/*
This code
1) Creates "10 votes per fake users
// for now everyone is in the same zone
To run, uncomment code below and restart server. Once database is updated, comment out code
*/

var db          = require('../config/db');
var voteQueries = require('./voteQueries.js');
var userQueries = require('../users/userQueries.js');
var zoneCalculator = require('../services/zoneCalculator.js')

var createFakeVotes = function (numPerUser) {
  userQueries.getAllUsers()
    .then(function(users){
      users.forEach(function(user){
        //For establishments in zipcode 94107;

        for(var x = 0; x < numPerUser; x++) {
          var vote = {};
          vote.establishmentId = Math.floor(Math.random()*3000 + 1);
          vote.traitId = Math.floor(Math.random()*9 + 1);
          vote.userId = user.id;
          vote.voteValue = Boolean(Math.floor(Math.random()*2));
          vote.time = new Date();
          zoneCalculator.zoneOfEstablishment(vote.establishmentId)
            .then(function (zoneNumber){
              vote.zoneNumber = zoneNumber;
              voteQueries.addVote(vote);
              // console.log(vote);
              // console.log(',');
            });
          }
      });
    })
    .catch(function(err) {
      console.error(err);
    });

};

createFakeVotes(25);
