import {ADD_VOTE} from './constants.js';
import {updateZoneSubscription, calcEstScores, addVoteToStore} from './utils.js';
import zoneHandler from './zoneHandler.js';
import updateUserZone from './action_updateZone.js';
import {store} from '../../App.js';

export default (userId,socket,oldZone,lat,long) => {
  return (dispatch) => {
    var newZone = zoneHandler.zoneCalculator(lat,long);
    
    socket.on('voteAdded',addVoteToStore.bind(null,dispatch));
    
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