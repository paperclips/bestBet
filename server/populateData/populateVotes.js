// VOTE POPULATOR
/*
This code
1) Creates "10 votes per fake users
// for now everyone is in the same zone
To run, uncomment code below and restart server. Once database is updated, comment out code
*/

var db       = require('../config/db');
var Users    = db.Users;
var Votes    = db.Votes;
var Estab    = db.Establishments;
var voteCtrl = require('../controllers/voteController.js');

var createFakeVotes = function (numPerUser) {
  Votes.max('time').then(function(maxVoteDate){
    if(maxVoteDate < new Date()-24&60*60*1000){
      Users.findAll({raw: true}).then(function(users){
        users.forEach(function(user){
          var numberArray = new Array(numPerUser+1).join('1').split('');
          //Find number of establishments in the database
      // TEMP -> makes sure test user votes on 2/3 establishments
          // Estab.findAll({raw:true}).then(function(estabs){
          //   estabs.forEach(function(est){
          //     if(est.id %6 !=0) {
          //       var vote = {};
          //       vote.establishmentId = est.id;
          //       vote.traitId = Math.floor(Math.random()*9 + 1);
          //       vote.zoneNumber = est.zoneNumber;
          //       vote.userId = 1;
          //       vote.voteValue = Boolean(Math.floor(Math.random()*2));
          //       vote.time = new Date();
          //       Votes.create(vote);
          //       voteCtrl.addVoteToHistory(vote.establishmentId, vote.traitId, vote.voteValue);
          //     }
          //   });
          // });
      // END TEMP -> makes sure test user votes on 2/3 establishments

          Estab.max('id').then(function(max) {
            if(max>0){
              Estab.findById(Math.floor(Math.random()*max+1))
                   .then(function (est){
                     var vote = {};
                     vote.establishmentId = est.id;
                     vote.zoneNumber = est.zoneNumber;
                     numberArray.forEach(function(){
                       vote.userId = user.id;
                       vote.traitId = Math.floor(Math.random()*9 + 1);
                       vote.voteValue = Boolean(Math.floor(Math.random()*2));
                       vote.time = new Date();
                       Votes.create(vote);
                       voteCtrl.addVoteToHistory(vote.establishmentId, vote.traitId, vote.voteValue);
                     }); 
                   })
                   .catch(function(err) {
                     console.error(err);
                   });
            }
          })
        });
      });
    }
  })
};

createFakeVotes(10);

