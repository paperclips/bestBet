import {RESET_TRAITS} from './constants.js';

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