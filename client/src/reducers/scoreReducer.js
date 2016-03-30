import { REPLACE_SCORES, UPDATE_SCORES } from '../actions/constants';

const INITIAL_STATE = {
  allTraits: null, //{estId: {1:{lp,lt,hp,ht,up,ut},2:{},...},...}
  userComboScore: null //{estId: {hist, live, user}}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REPLACE_SCORES:
      return action.payload;
    case UPDATE_SCORES:
      //action.payload is {estId, allTraits, userComboScore}
      var newState = Object.assign({},state);
      newState.allTraits[action.payload.estId] = action.payload.allTraits;
      newState.userComboScore[action.payload.estId] = action.payload.userComboScore;
      return newState;
    default:
      return state;
  }
}

