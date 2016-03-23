var Votes = require('../config/db').Votes;

// adds votes to the votes table
var addVotes = function (voteDetails) {
  // 
  Object.keys(voteDetails.votes).forEach(function(key){
    var vote = {establishmentId: voteDetails.establishmentId,
                traitId: key,
                userId: voteDetails.userId,
                voteValue: voteDetails.votes[key],
                time: voteDetails.time,
                zoneNumber: voteDetails.zoneNumber};

    Votes.create(vote);
    addVoteToHistory(voteDetails.establishmentId,key,voteDetails.votes[key]);
  });
};

// get all votes for an esablishment 
// recives an esablishmentId, and a time to go back (IN MILLISECONDS)
// if timeToGoBack isn't passed, we just get all the votes
var getVotesForEstablishment = function (estabId, timeToGoBack) {
  if (!timeToGoBack) {
    return Votes.findAll({where:{establishmentId:estabId}});
  } else {
    return Votes.findAll({where: {
      establishmentId:estabId,
      time: {$gt: new Date()-timeToGoBack}
    }});
  }
}
  
// get all votes in a set of zones
var getVotesInZones = function (zones) {
  return Votes.findAll({where:{zoneNumber: {$in:zones}}})
};

// get all votes in a set of zones
var getAllUserVotesInZones = function (userId, zones) {
  return Votes.findAll({raw: true, where:{userId: userId, zoneNumber: {$in:zones}}})
};

var addVoteToHistory = function (establishmentId, traitId, vote) {
  EstabHistories.find(
    {where: {establishmentId: est.id}})
    .then(function(estab){
      switch(traitId) {
        case 1:
          if(vote) estab.increment('trait1Pos');
          estab.increment('trait1Tot');
          break;
        case 2:
          if(vote) estab.increment('trait2Pos');
          estab.increment('trait2Tot');
          break;
        case 3:
          if(vote) estab.increment('trait3Pos');
          estab.increment('trait3Tot');
          break;
        case 4:
          if(vote) estab.increment('trait4Pos');
          estab.increment('trait4Tot');
          break;
        case 5:
          if(vote) estab.increment('trait5Pos');
          estab.increment('trait5Tot');
          break;
        case 6:
          if(vote) estab.increment('trait6Pos');
          estab.increment('trait6Tot');
          break;
        case 7:
          if(vote) estab.increment('trait7Pos');
          estab.increment('trait7Tot');
          break;
        case 8:
          if(vote) estab.increment('trait8Pos');
          estab.increment('trait8Tot');
          break;
        case 9:
          if(vote) estab.increment('trait9Pos');
          estab.increment('trait9Tot');
          break;
      }
    });

};


module.exports = {
  addVotes: addVotes,
  getVotesInZones: getVotesInZones,
  getAllUserVotesInZones: getAllUserVotesInZones,
  getVotesForEstablishment: getVotesForEstablishment,
  addVoteToHistory: addVoteToHistory
};