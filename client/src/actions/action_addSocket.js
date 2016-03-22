import {ADD_SOCKET, ADD_ESTABS} from './constants.js';

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
    type: ADD_ESTABS,
    payload: estabs
  }
}

function saveVoteToState(voteData){
  return {
    type: ADD_VOTE,
    payload: voteData
  }
};

export function addSocket (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabsAndVotes) => {addEstabToState(estabsAndVotes,dispatch,socket)});
};



