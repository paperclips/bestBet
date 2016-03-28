import { UPDATE_ALL, ADD_VOTE, REPLACE_ESTABS } from '../actions/constants';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_VOTE:
      var newState = Object.assign({},state);
      var voteEstId = action.payload.establishmentId;
      var newVotesArr = action.payload.votes;
      if(newState[voteEstId]){
        console.log('VOTES FOR ASIAN BOX:',newState[voteEstId].Votes.length);
        newState[voteEstId].Votes = newState[voteEstId].Votes.concat(newVotesArr);
      }
      return newState;
    case REPLACE_ESTABS:
      return action.payload;
    default:
      return state;
  }
}

