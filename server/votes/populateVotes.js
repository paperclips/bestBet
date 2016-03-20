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
var zoneHandler = require('../services/zoneHandler.js')

var createFakeVotes = function (numPerUser) {
  userQueries.getAllUsers()
    .then(function(users){
      users.forEach(function(user){
        //For establishments in zipcode 94107;
        var numberArray = new Array(numPerUser+1).join('1').split('');
        numberArray.forEach(function(){
          var vote = {};
          vote.establishmentId = Math.floor(Math.random()*40 + 1);
          vote.traitId = Math.floor(Math.random()*9 + 1);
          vote.userId = user.id;
          vote.voteValue = Boolean(Math.floor(Math.random()*2));
          vote.time = new Date();
          zoneHandler.zoneOfEstablishment(vote.establishmentId)
            .then(function (zoneNumber){
              vote.zoneNumber = zoneNumber;
              voteQueries.addVote(vote);
              // console.log(vote);
              // console.log(',');
            });
          })
      })
    })
    .catch(function(err) {
      console.error(err);
    });
};

createFakeVotes(10);
