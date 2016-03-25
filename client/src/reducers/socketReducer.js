import { ADD_SOCKET, CLEAR_SOCKET } from '../actions/constants';

export default function (state = null, action) {
  switch(action.type) {
    case ADD_SOCKET:
      return action.payload;
    case CLEAR_SOCKET:
      return null;  
    default:
      return state;
  }
}

