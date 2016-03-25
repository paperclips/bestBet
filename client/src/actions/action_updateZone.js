import {UPDATE_USER_ZONE} from './constants.js';

export default function(newZone) {
  return {
    type: UPDATE_USER_ZONE,
    payload: newZone
  }
}