import {ADD_SOCKET, REPLACE_ESTABS} from './constants.js';
import {calcAllScores, addVoteToStore} from './utils.js';
import {store} from '../../App.js';

function addSocketToState(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
};

function saveEstabsToState(estAndScores){
  return {
    type: REPLACE_ESTABS,
    payload: estAndScores
  }
};

function addEstabToState(estabs,dispatch,socket) {
  //Calculate and save estab scores
  const {user} = store.getState();
  let userCombo = user.traitCombo;
  let scoresObj = calcAllScores(estabs,userCombo);
  delete(estabs.Votes);
  console.log('Estabs Added at:',new Date());
  dispatch(saveEstabsToState({establishments: estabs, allTraits: scoresObj.allTraits, userComboScore: scoresObj.userComboScore}));
  socket.on('voteAdded',addVoteToStore.bind(null,dispatch));
};

export default function (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabs) => {addEstabToState(estabs,dispatch,socket)});
};



