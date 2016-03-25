import {LOGOUT} from './constants.js';
import clearSocket from './action_clearSocket';

function logOut() {
  return {
    type: LOGOUT
  }
}

export default (reactNavigator) => {
  return (dispatch) => {
    dispatch(logOut());
    dispatch(clearSocket());
    reactNavigator.immediatelyResetRouteStack([{ name: 'Login' }]);
  }
}