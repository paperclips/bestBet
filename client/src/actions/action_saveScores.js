import {SAVE_SCORES} from './constants.js';

function saveScore(scoreObj) {
  return {
    type: SAVE_SCORES,
    payload: scoreObj
  }
}

export default (scoreObj) => {
  return (dispatch) => {
    dispatch(saveScore(scoreObj));
  }
}