import { combineReducers } from 'redux';
import userReducer from './userReducer';
import estabReducer from './estabReducer';
import socketReducer from './socketReducer';
import scoreReducer from './scoreReducer';

module.exports = combineReducers({
  user: userReducer,
  allData: estabReducer,
  socket: socketReducer
  // scores: scoreReducer
})