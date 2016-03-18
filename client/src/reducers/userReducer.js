import { SIGNUP, LOGIN } from '../actions/constants';

const INITIAL_STATE = {
  username: null,
  token: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNUP:
      return action.payload
    // case LOGIN:
    //   return action.payload
    default:
      return state;
  }
}

