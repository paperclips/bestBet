import {RESET_TRAITS} from './constants.js';
//import {sendReq,updateZoneSubscription, connectSocket} from './utils.js';

import zoneHandler from './zoneHandler.js';
import addSocket from './action_addSocket';
import clearError from './action_clearError';

function resetTraits(traitCombo) {
  return {
    type: RESET_TRAITS,
    payload: traitCombo
  }
}

export default (userId, socket, traitCombo) => {
  return (dispatch) => {
    socket.emit('setUserTraits', {userId: userId, traitCombo: 1 * traitCombo.join('')});
    dispatch(resetTraits(traitCombo));
  }
}