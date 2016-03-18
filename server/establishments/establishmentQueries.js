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

module.exports = {
  getEstabsInZones: getEstabsInZones
};
