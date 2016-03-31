import {ADD_SOCKET, ADD_VOTE, REPLACE_ESTABS} from './constants.js';
import {calcAllScores, calcEstScores} from './utils.js';
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
  dispatch(saveEstabsToState({establishments: estabs, allTraits: scoresObj.allTraits, userComboScore: scoresObj.userComboScore}));

  socket.on('voteAdded', (voteData) => {
    dispatch(saveVoteToState(voteData));
  });
};

function saveVoteToState(voteData){
  //voteData is an object {establishmentId, userId, time, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var votesArray = Object.keys(voteData.votes).map(function(traitId){
    return {traitId: traitId,
            voteValue: Boolean(voteData.votes[traitId]),
            time: voteData.time}
  });

  //If user's own vote came back:
  const {user, allData} = store.getState();
  var userVotes = [];
  if(user.id === voteData.userId){userVotes = votesArray;};

  //Update scores for relevant establishment
  var estId = voteData.establishmentId;
  var estAllTraits = allData.allTraits[estId];
  var userTraitCombo = user.traitCombo;
  var scoreObj = calcEstScores(user.id, estAllTraits,userTraitCombo, voteData);//{allTraits, userComboScore}

  var updateObject = {estId: estId, votes: votesArray, userVotes: userVotes, allTraits: scoreObj.allTraits, userComboScore: scoreObj.userComboScore};

  return {
    type: ADD_VOTE,
    payload: updateObject
  }
};

export default function (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabs) => {addEstabToState(estabs,dispatch,socket)});
};



