import {ADD_SOCKET, ADD_VOTE, REPLACE_ESTABS} from './constants.js';

function addSocketToState(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
};

function addEstabToState(estabs,dispatch,socket) {
  dispatch(saveEstabsToState(estabs));
  socket.on('voteAdded', (voteData) => {dispatch(saveVoteToState(voteData))});
};

function saveEstabsToState(estabs){
  return {
    type: REPLACE_ESTABS,
    payload: estabs.establishments
  }
}

function saveVoteToState(voteData){
  //voteData is an object {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var votesArray = Object.keys(voteData.votes).map(function(traitId){
    return {userId: voteData.userId,
            traitId: traitId,
            voteValue: Boolean(voteData.votes[traitId]),
            time: voteData.time}
  });
  var voteObject = {establishmentId: voteData.establishmentId, votes: votesArray};
  console.log('VOTE OBJECT:', voteObject);
  
  return {
    type: ADD_VOTE,
    payload: voteObject
  }
};

export default function (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabs) => {addEstabToState(estabs,dispatch,socket)});
};



