import {UPDATE_SCORES} from './constants.js';

function updateScore(scoreObj) {
  return {
    type: UPDATE_SCORES,
    payload: scoreObj
  }
}

export default (scoreObj) => {
  return (dispatch) => {
    dispatch(updateScore(scoreObj));
  }
}