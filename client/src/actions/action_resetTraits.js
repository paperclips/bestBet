import {RESET_TRAITS, REPLACE_USERCOMBOSCORE} from './constants.js';
import {allEstUserComboScores} from './utils.js';
import {store} from '../../App.js';

function resetTraits(traitCombo) {
  return {
    type: RESET_TRAITS,
    payload: traitCombo
  }
}

function updateUserComboScores(userComboScores) {
  return {
    type: REPLACE_USERCOMBOSCORE,
    payload: userComboScores
  }
}

export default (userId, socket, traitCombo) => {
  return (dispatch) => {
    //Save traits to store, emit event only if userId and socket are passed in
    if(userId && socket){
      socket.emit('setUserTraits', {userId: userId, traitCombo: 1 * traitCombo.join('')});
    }
    const {allData} = store.getState();
    let userComboScores = allEstUserComboScores(allData.establishments,traitCombo,allData.allTraits);
    dispatch(resetTraits(traitCombo));
    dispatch(updateUserComboScores(userComboScores));
  }
}