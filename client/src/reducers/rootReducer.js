import { combineReducers } from 'redux';
import userReducer from './userReducer';
import estabReducer from './estabReducer';
import socketReducer from './socketReducer';

module.exports = combineReducers({
  user: userReducer,
  allData: estabReducer,
  socket: socketReducer
})