// vote queries
var models = require('../config/db.js');
var votes = models.Votes;

// add vote
var addVote = function (vote) {
  votes.create({
    establishmentId: vote.establishmentId,
    traitId: vote.traitId,
    userId: vote.userId,
    voteValue: vote.voteValue,
    time: vote.time,
    zoneNumber: vote.zoneNumber
  })
  .then(function (vote){
    return;
  })
  .catch(function(err){
    console.error(err);
  });
};
// get all votes in a set of zones
var getVotesInZones = function (zones) {
  return votes.findAll({where:{zoneNumber: {$in:zones}}})
    .then(function(votesInZones){
      return votesInZones;
    });
};

module.exports = {
  addVote: addVote,
  getVotesInZones: getVotesInZones
};
//
// var Votes = db.define('Votes', {
//     id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     establishmentId: {type: Sequelize.INTEGER, notNull: true},
//     traitId: {type: Sequelize.INTEGER, notNull: true},
//     userId: {type: Sequelize.INTEGER, notNull: true},
//     voteValue: {type: Sequelize.BOOLEAN, notNull: true},
//     time: {type: Sequelize.DATE, notNull: true},
//     zoneLat: {type: Sequelize.INTEGER, notNull: true},
//     zoneLon: {type: Sequelize.INTEGER, notNull: true}
//   }, { timestamps: false });
