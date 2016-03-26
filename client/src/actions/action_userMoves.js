import {updateZoneSubscription} from './utils.js';
import zoneHandler from './zoneHandler.js';
import updateUserZone from './action_updateZone.js';

export default (userId,socket,oldZone,lat,long) => {
  return (dispatch) => {
    var newZone = zoneHandler.zoneCalculator(lat,long);
    if(newZone !== oldZone){
      var zonesToUpdate = zoneHandler.getNewZonesOnMove(oldZone,newZone);//[[leave],[join]];
      updateZoneSubscription(socket,zonesToUpdate[0],zonesToUpdate[1]);//Join and Leave rooms
      
      var allNineZones = zoneHandler.getSurroundingZones(newZone);
      
      console.log('NEWZONES:',allNineZones);
      // if(zonesToUpdate[1].length){
      //   socket.emit('Get Establishments',{userId: userId, zones: zonesToUpdate[1]});
      // }
      if(allNineZones.length){
        socket.emit('Get Establishments',{userId: userId, zones: allNineZones});
      }

      dispatch(updateUserZone(newZone));
    }
  }
}