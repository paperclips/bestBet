import { UPDATE_ALL, ADD_VOTE, REPLACE_ESTABS } from '../actions/constants';
import Immutable from 'immutable';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_VOTE:
      return state;//Update this when votint functionality is ready
    case REPLACE_ESTABS:
      return action.payload;
    default:
      return state;
  }
}

