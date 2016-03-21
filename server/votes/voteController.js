var Votes = require('../config/db').Votes;

// adds votes to the votes table
var addVotes = function (voteDetails) {
  Object.keys(voteDetails.votes).forEach(function(key){
    var vote = {establishmentId: voteDetails.establishmentId,
                traitId: key,
                userId: voteDetails.userId,
                voteValue: voteDetails.votes[key],
                time: voteDetails.time,
                zoneNumber: voteDetails.zoneNumber};

    Votes.create(vote);
  });
};
  
// get all votes in a set of zones
var getVotesInZones = function (zones) {
  return Votes.findAll({where:{zoneNumber: {$in:zones}}})
};

// get all votes in a set of zones
var getAllUserVotesInZones = function (userId, zones) {
  return Votes.findAll({where:{userId: userId, zoneNumber: {$in:zones}}})
};

module.exports = {
  addVotes: addVotes,
  getVotesInZones: getVotesInZones,
  getAllUserVotesInZones: getAllUserVotesInZones
};