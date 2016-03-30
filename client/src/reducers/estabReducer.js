import { UPDATE_ALL, ADD_VOTE, REPLACE_ESTABS } from '../actions/constants';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_VOTE:
      var newState = Object.assign({},state);
      var voteEstId = action.payload.establishmentId;
      var newVotesArr = action.payload.votes;
      var newUserVotesArr = action.payload.userVotes;

      if(newState[voteEstId]){
        console.log('VOTES FOR ASIAN BOX:',newState[voteEstId].Votes.length);
        newState[voteEstId].Votes = newState[voteEstId].Votes.concat(newVotesArr);
        newState[voteEstId].userVotes = newState[voteEstId].userVotes.concat(newUserVotesArr);
      }
      return newState;
    case REPLACE_ESTABS:
      return action.payload;
    default:
      return state;
  }
}

