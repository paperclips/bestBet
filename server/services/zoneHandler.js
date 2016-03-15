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
      var zone = zoneNumber + x * NUM_OF_COLS + y;
      if(isAZone(zone)) {
        zoneArr.push(zone);
      }
    }
  }
  return zoneArr;
};

var isAZone = function (zoneNumber) {
  if(zoneNumber >= 0 && zoneNumber % 1000 < 22 && (NUM_OF_ROWS-1)*1000+(NUM_OF_COLS) && zoneNumber < (NUM_OF_ROWS-1)*1000+(NUM_OF_COLS) && (zoneNumber+1) % 1000 > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  getSurroundingZones: getSurroundingZones,
  getNewZonesOnMove: getNewZonesOnMove
};


//OLD:

// calulates the nature of the move based on the relation between the zone numbers
// var getNewZonesOnMove = function (oldZone, newZone) {
//   // set an array to hold the oldZone numbers and newZone numbers
//   var zonesToUpdate = [[],[]];
//   // if the zone is in the same row
//   if(Math.abs(newZone-oldZone) === 1) {
//     //if the newZone is left AND it's not the very left edge
//       if (newZone < oldZone && ) {
//
//         // add the col left of boundary to new, right of bound to old
//         zonesToUpdate[1] = getALineOfZones(newZone, "w");
//         zonesToUpdate[0] = getALineOfZones(newZone, "e");
//       } else { // if the zone is right
//         // if it's not the very RIGHT edge
//         // add the col right of boundary to new, left of bound to old
//         zonesToUpdate[1] = getALineOfZones(newZone, "e");
//         zonesToUpdate[0] = getALineOfZones(newZone, "w");
//       }
//   } else {// if the newZone is NOT in the same row
//     // if it's above to oldZone
//     if (newZone < oldZone) {
//       // add the row above of boundary to new, below of bound to old
//       zonesToUpdate[1] = getALineOfZones(newZone, "n");
//       zonesToUpdate[0] = getALineOfZones(newZone, "s");
//
//       // if it's in the same column
//       if(isACorner() === false) {
//         return zonesToUpdate;
//       } else if (isACorner() === 'e') {
//         // add the east row to the north row
//         _.uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "e")));
//         _.uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "w")));
//         return zonesToUpdate;
//
//       } else {
//         _.uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "w")));
//         _.uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "e")));
//         return zonesToUpdate;
//       }
//     } else { // if the zone is below oldZone
//       // get the row below the boundary
//       zonesToUpdate[1] = getALineOfZones(newZone, "n");
//       zonesToUpdate[0] = getALineOfZones(newZone, "s");
//       if(isACorner === false) {
//         return zonesToUpdate;
//       } else if (isACorner() === 'e') {
//         // add the east row to the south row
//         _.uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "e")));
//         _.uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "w")));
//         return zonesToUpdate;
//       } else {
//         // add the west row to the south row
//         _.uniq(zonesToUpdate[1].concat(getALineOfZones(newZone, "w")));
//         _.uniq(zonesToUpdate[0].concat(getALineOfZones(newZone, "e")));
//         return zonesToUpdate;
//       }
//     }
//   } //
//   function isACorner (){
//     if(newZone % oldZone === 0) { // if it's in the same col, it's not a corner
//       return false;
//     } else if (newZone % oldZone === 1) { // if it's in the right column
//       return "e";
//     } else { // else means it's left
//       return "w";
//     }
//   }
// };
//
// var getALineOfZones = function (zoneNumber, dir) {
//   var line = [];
//   switch(dir) {
//     case 'n':
//       if (ZoneNumber>=1000) {
//         for (var x = -1; x <=1; x++) {
//           line.push(zoneNumber - NUM_OF_COLS + x);
//         }
//       }
//       break;
//     case 'w':
//       if (zoneNumber % 1000 !== 0) {
//         for (var x = -1; x <=1; x++) {
//           line.push(zoneNumber - NUM_OF_COLS * x -1);
//         }
//       }
//     break;
//     case 's':
//       if(zoneNumber>=NUM_OF_ROWS*1000) {
//         for (var x = -1; x <=1; x++) {
//           line.push(zoneNumber + NUM_OF_COLS + x);
//         }
//       }
//       break;
//     case 'e':
//       if(zoneNumber % 1000 >= NUM_OF_COLS)
//       for (var x = -1; x <=1; x++) {
//         line.push(zoneNumber + NUM_OF_COLS*x -1);
//       }
//       break;
//   }
//   return line;
// };







// not sure if we'll need this since the CLIENT will calc this and store it and send it
// var calculateZoneNumber = function (long, lat) {
//   // calculate zone name based on mutliplying and flooring... of longs and lats
//   // TBD when we find the zone system
// };
