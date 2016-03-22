import { SIGNUP, LOGIN } from '../actions/constants';

const INITIAL_STATE = {
  id: null,
  name: null,
  userName: null,
  token: null,
  traitCombo: null,
  userZone: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNUP:
      return action.payload;
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
}

