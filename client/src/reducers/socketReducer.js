import { ADD_SOCKET } from '../actions/constants';

export default function (state = null, action) {
  switch(action.type) {
    case ADD_SOCKET:
      return action.payload
    default:
      return state;
  }
}

