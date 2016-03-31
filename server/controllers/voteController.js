var Votes = require('../config/db').Votes;
var Establishments = require('../config/db').Establishments;

// adds votes to the votes table
var addVotes = function (voteDetails) {
  Object.keys(voteDetails.votes).forEach(function(key){
    var vote = {establishmentId: voteDetails.establishmentId,
                traitId: key,
                userId: voteDetails.userId,
                voteValue: voteDetails.votes[key],
                time: voteDetails.time,
              };

    Votes.create(vote);
    addVoteToHistory(voteDetails.establishmentId,key,voteDetails.votes[key]);
  });
};

var addVoteToHistory = function (establishmentId, traitId, vote) {
  Establishments.findOne({where: {id: establishmentId}})
    .then(function(estab){
      vote && estab.increment('trait' + traitId + 'Pos');
      estab.increment('trait' + traitId + 'Tot');
    });
};

module.exports = {
  addVotes: addVotes,
  addVoteToHistory: addVoteToHistory
};