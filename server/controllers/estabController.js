var Establishments = require('../config/db').Establishments;
var Votes = require('../config/db').Votes;

// get all establishments in these zones
var getEstabsInZones = function(userId, zones) {
  // Find all establishmenents in zones, and include last 24 hours of votes for each trait,
  // plus lifetime votes by this user
  return Establishments.findAll({raw: true,
                                 where:{zoneNumber:{$in:zones}},
                                 include: [{model: Votes,
                                            required: false,
                                            where: {$or: [{$and: [{traitId: 1},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 2},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 3},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 4},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 5},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 6},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 7},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 8},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {$and: [{traitId: 9},{time: {$gt: new Date()-24*60*60*1000}}]},
                                                          {userId: userId}
                                                         ]}}]});
};

module.exports = {
  getEstabsInZones: getEstabsInZones
};
