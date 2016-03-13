// user controller
var zoneHandler = require('../services/zoneHandler.js');

// sets the users current zone and sends back the relevant establishments
function setUserZone (user) {
  // calls zoneHandler (not asynchronous)
  zoneHandler.move (user);
  // zoneHandler service DELETES socketId from old zone, adds socketId to new zone
  sendSurroundingEstablishments (user);
};

// gets the currently surrounding establishments and emits back to client...
function sendSurroundingEstablishments (user) {
  // LOAD establishment data (from establishment table in DB) for appropriate zones
  // LOAD vote data (from vote table in DB) for appropriate establishments
  // send back JWOT and relevant establishment data and relevant vote data
};

// changes the user's stored default traits in the DB -- doesn't send anything back
function changeDefaultTraits (user) {
  // note - the client will also reset them locally, and we WON'T send these back to the client
  // the client will only reference them on next login
};
module.exports = {
  setUserZone: setUserZone,
  sendSurroundingEstablishments: sendSurroundingEstablishments,
  changeDefaultTraits: changeDefaultTraits
};
