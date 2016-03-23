import { combineReducers } from 'redux';
import userReducer from './userReducer';
import estabReducer from './estabReducer';

export default rootReducer = combineReducers({
  user: userReducer,
  establishments: estabReducer
})