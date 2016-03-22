import LOGIN from './constants.js';
import sendReq from './utils.js';
import updateZoneSubscription from './utils.js';

import zoneHandler from './zoneHandler.js';
import getEstablishments from './action_getEstablishments';
import addSocket from './action_addSocket';
import connectSocket from './utils';

function userLogin(userData) {
  return {
    type: LOGIN,
    payload: userData
  }
}


//{id: user.id, name: user.name, userName: user.userName, token: token, traitCombo: traitCombo}
export default (user, navigator) => {
  return (dispatch) => {
    sendReq('POST','/login',user).then(function(res){
      if(res.status === 200){
        let body = res.body;
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let userZone = zoneHandler.zoneCalculator(position.coords.latitute, position.coords.longitude);
            let estabZones = zoneHandler.getSurroundingZones(userZone);
            body.userZone = userZone;
            var socket = connectSocket();
            addSocket(dispatch, socket);//saves socket into state, adds listeners for ('New Establishments', 'voteAdded')
            dispatch（userLogin(body)); //save user info to user state
            socket.emit('Get Establishments',{userId: body.id, zones: estabZones});
            updateZoneSubscription(socket,[],estabZones)); //joins zones
            navigator.immediatelyResetRouteStack([{ name: 'Map' }]);//then redirect user to mapview
          });
      } else {
        dispatch（userLogin(res.body)) //add error to user state
      }
    }
  }
}