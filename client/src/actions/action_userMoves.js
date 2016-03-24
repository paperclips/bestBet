import {UPDATE_USER_ZONE} from './constants.js';
import {sendReq,updateZoneSubscription, connectSocket} from './utils.js';
import zoneHandler from './zoneHandler.js';
import addSocket from './action_addSocket';

function updateUserZone(newZone){
  return {
    type: UPDATE_USER_ZONE,
    payload: newZone
  }
}

export default (userId,socket,oldZone,lat,long) => {
  return (dispatch) => {
    var newZone = zoneHandler.zoneCalculator(lat,long);
    if(newZone !== oldZone){
      var zonesToUpdate = zoneHandler.getNewZonesOnMove(oldZone,newZone);//[[leave],[join]];
      updateZoneSubscription(socket,zonesToUpdate[0],zonesToUpdate[1]);//Join and Leave rooms
      socket.emit('Get Establishments',{userId: userId, zones: zonesToUpdate[1]});
      dispatch(updateUserZone(newZone));
    }
  }
}