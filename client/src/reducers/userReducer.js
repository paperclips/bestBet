import { LOGIN, LOGOUT, UPDATE_USER_ZONE, CLEAR_ERROR, RESET_TRAITS } from '../actions/constants';

const INITIAL_STATE = {
  id: null,
  name: null,
  userName: null,
  token: null,
  traitCombo: null,
  userZone: null,
  latitude: null,
  longitude: null,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return INITIAL_STATE;  
    case UPDATE_USER_ZONE:
      return {...state, userZone: action.payload};
    case CLEAR_ERROR:
      return {...state, error: ''};
    case RESET_TRAITS:
      return {...state, traitCombo: action.payload};  
    default:
      return state;
  }
}

