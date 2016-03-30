import {REPLACE_SCORES} from './constants.js';

function replaceScores(scoreObj) {
  return {
    type: REPLACE_SCORES,
    payload: scoreObj
  }
}

export default (scoreObj) => {
  return (dispatch) => {
    dispatch(replaceScores(scoreObj));
  }
}