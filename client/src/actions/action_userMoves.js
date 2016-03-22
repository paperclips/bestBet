//Receives navigator

//calculate newZone from coordinates
//call getNewZonesOnMove with user's oldZone from the store and newZone; [[leave zones], [join zones]]
//dispatch getEstablishments action that will get establishments in zones listed under "join zones"
//call socket function to leave old zones and join new zones
  //call utils.connectSocket,
  //pass socket connection, joinZones, leaveZones to AddListeners functions, that calls RemoveListener function with leaveZones;
//call action_updateUserZone with newZone