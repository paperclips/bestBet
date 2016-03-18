// establishment queries
var models = require('../config/db.js');
var Establishments = models.Establishments;

// get establishments in a certain zone
//zoneLat, zoneLong
var getEstabsInZones = function(zones) {
  return Establishments.findAll({where:{zoneNumber:{$in:zones}}})
    .then(function(estabsInZones){
      return estabsInZones;
    });
};

var getEstablishmentById = function (theID) {
  return Establishments.findOne({where:{id:theID}})
    .then(function(establishment){
      return establishment;
    });
};

module.exports = {
  getEstabsInZones: getEstabsInZones,
  getEstablishmentById: getEstablishmentById
};
