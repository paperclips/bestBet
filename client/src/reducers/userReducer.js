import { LOGIN, UPDATE_USER_ZONE } from '../actions/constants';

const INITIAL_STATE = {
  id: null,
  name: null,
  userName: null,
  token: null,
  traitCombo: null,
  userZone: null,
  error: ''
};

export default function (state = {}, action) {
  switch(action.type) {
    case LOGIN:
      return action.payload;
    case UPDATE_USER_ZONE:
      return {...state, userZone: action.payload}
    default:
      return state;
  }
}

