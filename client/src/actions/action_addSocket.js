import {ADD_SOCKET, ADD_VOTE, REPLACE_ESTABS} from './constants.js';

function addSocketToState(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
};

function addEstabToState(estabs,dispatch,socket) {
  console.log("ESTABS ---- >", estabs);
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
  return {
    type: ADD_VOTE,
    payload: voteData
  }
};

export default function (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabs) => {addEstabToState(estabs,dispatch,socket)});
};



