import {ADD_SOCKET, ADD_VOTE, REPLACE_ESTABS} from './constants.js';
import {calcAllScores} from './utils.js';
import replaceScores from './action_replaceScores';
import updateScores from './action_updateScores';
import {store} from '../../App.js';

function addSocketToState(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
};

function saveEstabsToState(estabs){
  return {
    type: REPLACE_ESTABS,
    payload: estabs
  }
};

//On Vote Added event
function updScores(voteData, dispatch){
  const {scores, user} = store.getState();
  const estId = voteData.establishmentId;
  let allTraits = scores.allTraits[estId]; //Get scores from store
  if(allTraits){
    Object.keys(voteData.votes).forEach((traitId) => {
      allTraits[traitId].lp+= voteData.votes[traitId];
      allTraits[traitId].lt++;
      allTraits[traitId].hp+= voteData.votes[traitId];
      allTraits[traitId].ht++;
      if(user.id === voteData.userId){
        allTraits[traitId].up+= voteData.votes[traitId];
        allTraits[traitId].ut++;
      }
    });
  };
  let userCombo = user.traitCombo; //Get user traits array from store
  let hp = 0, ht = 0, lp = 0, lt = 0, up = 0, ut = 0;
  userCombo.forEach((traitId) => {
    hp+=allTraits[traitId].hp;
    ht+=allTraits[traitId].ht;
    lp+=allTraits[traitId].lp;
    lt+=allTraits[traitId].lt;
    up+=allTraits[traitId].up;
    ut+=allTraits[traitId].ut;
  });
  let histScore = ht === 0 ? 0 : Math.round(hp/ht*10);
  let liveScore = lt === 0 ? 0 : Math.round(lp/lt*10);
  let userScore = ut === 0 ? 2 : Math.round(up/ut);
  let userComboScore = {histScore, liveScore, userScore};
  
  let estabScoreObj = {estId, allTraits, userComboScore}
  dispatch(updateScores(estabScoreObj));
};

function addEstabToState(estabs,dispatch,socket) {
  dispatch(saveEstabsToState(estabs));
  //Calculate and save estab scores
  const {user} = store.getState();
  let userCombo = user.traitCombo;
  let scoresObj = calcAllScores(estabs,userCombo);
  dispatch(replaceScores(scoresObj));

  socket.on('voteAdded', (voteData) => {
    dispatch(saveVoteToState(voteData));
    updScores(voteData, dispatch);
  });
};

function saveVoteToState(voteData){
  //voteData is an object {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var votesArray = Object.keys(voteData.votes).map(function(traitId){
    return {traitId: traitId,
            voteValue: Boolean(voteData.votes[traitId]),
            time: voteData.time}
  });

  //If user's own vote came back:
  const {user} = store.getState();
  var userVotes = [];
  if(user.id === voteData.userId){
    userVotes = votesArray;
  };

  var voteObject = {establishmentId: voteData.establishmentId, votes: votesArray, userVotes: userVotes};

  return {
    type: ADD_VOTE,
    payload: voteObject
  }
};

export default function (dispatch,socket){
  dispatch(addSocketToState(socket));
  socket.on('New Establishments', (estabs) => {addEstabToState(estabs,dispatch,socket)});
};



