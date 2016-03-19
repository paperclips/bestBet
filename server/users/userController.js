// user controller
var zoneHandler = require('../services/zoneHandler.js');
var estabQueries = require('../establishments/establishmentQueries.js');
var voteQueries = require('../votes/voteQueries.js');
var userQueries = require('../users/userQueries.js');

// sets the users current zone and sends back the relevant establishments
var setUserZone = function (socket, userOldZone, userNewZone) {
  var zones = [];
  // if the user has just logged in, we need to get all 9 relevant zones
  if(userOldZone === null) {
    zones[1] = zoneHandler.getSurroundingZones(userNewZone);
    zones[0] = [];
  } else {// if there was an old zone though, we only need to send a certain group of new ones
    zones = zoneHandler.getNewZonesOnMove(userOldZone, userNewZone);
  }
  // join the user to the zone rooms
  zones[0].forEach(function(zone){
    socket.leave(zone);
    // leave the room
  });
  zones[1].forEach(function(zone){
    socket.join(zone);
    // join the room
  });
  sendData(socket, zones[1]);
};

// gets the currently surrounding establishments and emits back to client...
var sendData = function (socket, zones) {
  // LOAD establishment data (from establishment table in DB) for appropriate zones
  estabQueries.getEstabsInZones(zones)
    .then(function(zoneEstabs){
      voteQueries.getVotesInZones(zones)
        .then(function(zoneVotes){
          for(var i=0; i< zoneEstabs.length;i++){
            var estab = zoneEstabs[i].dataValues;
            var voteArr = zoneVotes.filter(function(vote){return vote.establishmentId === estab.id})
                                      .map(function(vote){return {traitId: vote.traitId, voteValue: vote.voteValue, time: vote.time}});
            
            estab.votes = voteArr;
            //Emit events once loop is complete and all establishments have votes array
            if(i === zoneEstabs.length-1){
              socket.emit('New Establishments', {establishments:zoneEstabs});  
            }
          }
        })
    })
};
// changes the user's stored default traits in the DB -- doesn't send anything back
var changeDefaultTraits = function (user) {
  userQueries.updateUserInfo(user.id, user.traits);
  // note - the client will also reset them locally, and we WON'T send these back to the client
  // the client will only reference them on next login
};
module.exports = {
  setUserZone: setUserZone,
  sendData: sendData,
  changeDefaultTraits: changeDefaultTraits
};
