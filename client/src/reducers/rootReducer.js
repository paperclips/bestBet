import { combineReducers } from 'redux';
import userReducer from './userReducer';
import estabReducer from './estabReducer';
import socketReducer from './socketReducer';

export default rootReducer = combineReducers({
  user: userReducer,
  establishments: estabReducer,
  socket: socketReducer
})