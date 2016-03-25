import {LOGOUT} from './constants.js';
import clearSocket from './action_clearSocket';

function logOut() {
  return {
    type: LOGOUT
  }
}

export default (reactNavigator) => {
  return (dispatch) => {
    reactNavigator.immediatelyResetRouteStack([{ name: 'Login' }]);
    dispatch(logOut());
    dispatch(clearSocket());
  }
}