// zoneHandler services
var _ = require('underscore');
// these variables  represent the width/height of the theoretical zone Matrix
var NUM_OF_ROWS = 13;
var NUM_OF_COLS = 22;

// RECEIVES an Old zone number and the new zone number
// RETURNS and array of two arrays:
  // first array is the zones to unsub from
  // second array is the new zones to sub to
var getNewZonesOnMove = function (oldZoneNumber, newZoneNumber) {
  var oldZones = getSurroundingZones(oldZoneNumber);
  var newZones = getSurroundingZones(newZoneNumber);
  var zonesToUpdate = [[],[]];
  zonesToUpdate[0] = _.difference(oldZones, newZones);
  zonesToUpdate[1] = _.difference(newZones, oldZones);
  return zonesToUpdate;
};

// RECEIVES a zone number
// RETURNS and array containing that zone number and the 8 surrounding zones
var getSurroundingZones = function (zoneNumber) {
  var zoneArr = [];
  for (var x = -1; x <=1; x++) {
    for (var y = -1; y <=1; y++) {
      var zone = zoneNumber + y * 1000 + x;
      if(isAZone(zone)) {
        zoneArr.push(zone);
      }
    }
  }
  return zoneArr;
};

var isAZone = function (zoneNumber) {
  if(zoneNumber >= 0 &&
    zoneNumber % 1000 < NUM_OF_COLS &&
    zoneNumber < (NUM_OF_ROWS-1)*1000+(NUM_OF_COLS) &&
    (zoneNumber+1) % 1000 > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  getSurroundingZones: getSurroundingZones,
  getNewZonesOnMove: getNewZonesOnMove
};