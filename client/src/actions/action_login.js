import {LOGIN} from './constants.js';
import {sendReq,updateZoneSubscription, connectSocket} from './utils.js';

import zoneHandler from './zoneHandler.js';
import getEstablishments from './action_getEstablishments';
import addSocket from './action_addSocket';

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
        let body = res._bodyText;
        // function gotLocation(position){
        //   console.log('PPPPPPPOS:',position);
        //   let userZone = zoneHandler.zoneCalculator(position.coords.latitute, position.coords.longitude);
        //   let estabZones = zoneHandler.getSurroundingZones(userZone);
        //   body.userZone = userZone;
        //   var socket = connectSocket();
        //   addSocket(dispatch, socket);//saves socket into state, adds listeners for ('New Establishments', 'voteAdded')
        //   dispatch(userLogin(body)); //save user info to user state
        //   socket.emit('Get Establishments',{userId: body.id, zones: estabZones});
        //   updateZoneSubscription(socket,[],estabZones); //joins zones
        //   navigator.immediatelyResetRouteStack([{ name: 'Map' }]);//then redirect user to mapview
        // };
        // function logError(error) {
        //   console.log('Navigator \'getCurrentPosition\' error:', error);
        // };
        // console.log(navigator);
        // navigator.geolocation.getCurrentPosition(position => gotLocation(position), logError);

        var geolocationSearch = function () {
          console.log('INSIDE geolocationSearch!!!!!!!')
          var success = function (position) {
            console.log('SSsSSSSSSSSSSsuccess', lat, lon);

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log('success GOT LOC!!!!', lat, lon);
            /// Update state with new API Data based on lat lon
            this.updateState(null, lat, lon);
          }.bind(this);
        
          /// Error'd geolocation
          var error = function (error) {
            if (error.message == 'User denied Geolocation')
            {
              alert('Please enable location services');
            }
          };
          
          /// Get the position
          navigator.geolocation.getCurrentPosition(success, error);
        }
      geolocationSearch();

      } else {
        dispatch(userLogin(res._bodyText)) //add error to user state
      }
    })
  }
}