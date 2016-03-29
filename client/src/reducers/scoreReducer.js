import { SAVE_SCORES } from '../actions/constants';

export default function (state = {}, action) {
  switch (action.type) {
    case SAVE_SCORES:
      return action.payload;
    default:
      return state;
  }
}

