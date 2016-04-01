import {ADD_VOTE} from './constants.js';

export default function saveVoteToState(updateObject){
  return {
    type: ADD_VOTE,
    payload: updateObject
  }
};