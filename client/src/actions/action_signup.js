import { SIGNUP } from './constants';

function user_signup(userData) {
  return {
    type: SIGNUP,
    payload: userData
  }
}

export default (user) => {
  return (dispatch) => {
  //send request with user information
    //if res.status returns 200
      //res.body.username == user.username;
      //dispatch(user_signup(res.body));
  }
}