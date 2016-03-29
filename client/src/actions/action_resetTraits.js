import {RESET_TRAITS} from './constants.js';

function resetTraits(traitCombo) {
  return {
    type: RESET_TRAITS,
    payload: traitCombo
  }
}

export default (userId, socket, traitCombo) => {
  return (dispatch) => {
    //Save traits to store, emit event only if userId and socket are passed in
    if(userId && socket){
      socket.emit('setUserTraits', {userId: userId, traitCombo: 1 * traitCombo.join('')});
    }
    dispatch(resetTraits(traitCombo));
  }
}