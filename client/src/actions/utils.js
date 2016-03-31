//functions that send post req to server w/ user info
import io from 'socket.io-client/socket.io';
import zoneHandler from './zoneHandler.js';
import _ from 'underscore';

// const SERVER_URL = 'http://10.8.30.75:3000';
const SERVER_URL = 'http://localhost:3000';
// const SERVER_URL = 'http://104.131.12.172:3000';

export function sendReq (method,route,body){
  const url = `${SERVER_URL}${route}`;
  const headers = { 'Content-Type': 'application/json'};
  const options = {headers,method}
  options.body = JSON.stringify(body);
  return fetch(url, options)
};

//Connect socket
export function connectSocket(){
  return io.connect(SERVER_URL, { jsonp: false });
};

export function updateZoneSubscription(socket, oldZones, newZones){
  socket.emit('leaveRooms', oldZones);
  socket.emit('joinRooms', newZones);
};

//Calculate scores for all establishments (for login and zone change events)
export function calcAllScores(estabsObj,userCombo){
  let allTraits = {};
  let userComboScore = {};

  _.each(estabsObj, (estab) => {
    let estTraitScores = {1:{lp:0, lt:0, hp:estab.trait1Pos, ht:estab.trait1Tot, up:0, ut:0},
                          2:{lp:0, lt:0, hp:estab.trait2Pos, ht:estab.trait2Tot, up:0, ut:0},
                          3:{lp:0, lt:0, hp:estab.trait3Pos, ht:estab.trait3Tot, up:0, ut:0},
                          4:{lp:0, lt:0, hp:estab.trait4Pos, ht:estab.trait4Tot, up:0, ut:0},
                          5:{lp:0, lt:0, hp:estab.trait5Pos, ht:estab.trait5Tot, up:0, ut:0},
                          6:{lp:0, lt:0, hp:estab.trait6Pos, ht:estab.trait6Tot, up:0, ut:0},
                          7:{lp:0, lt:0, hp:estab.trait7Pos, ht:estab.trait7Tot, up:0, ut:0},
                          8:{lp:0, lt:0, hp:estab.trait8Pos, ht:estab.trait8Tot, up:0, ut:0},
                          9:{lp:0, lt:0, hp:estab.trait9Pos, ht:estab.trait9Tot, up:0, ut:0}};

    estab.Votes.forEach((vote) => {
      estTraitScores[vote.traitId].lp+=vote.voteValue;
      estTraitScores[vote.traitId].lt++;
    });
    estab.userVotes.forEach((vote) => {
      estTraitScores[vote.traitId].up+=vote.voteValue;
      estTraitScores[vote.traitId].ut++;
    });
    allTraits[estab.id] = estTraitScores;

    //Combined scores for user traits
    userComboScore[estab.id] = updateEstUserComboScores(userCombo,estTraitScores);
  });

  return {allTraits, userComboScore};
};

//Calculate scores for one establishments (for vote event)
export function calcEstScores(userId, estTraitScores, userTraitCombo, voteData){
  if(estTraitScores){
    Object.keys(voteData.votes).forEach((traitId) => {
      estTraitScores[traitId].lp+= voteData.votes[traitId];
      estTraitScores[traitId].lt++;
      estTraitScores[traitId].hp+= voteData.votes[traitId];
      estTraitScores[traitId].ht++;
      if(userId === voteData.userId){
        estTraitScores[traitId].up+= voteData.votes[traitId];
        estTraitScores[traitId].ut++;
      }
    });
  };
  
  let userComboScore = updateEstUserComboScores(userTraitCombo, estTraitScores);
  return {estTraitScores, userComboScore}
};

//Calculate userComboScores for one establishment
export function updateEstUserComboScores(userTraitCombo,estTraitScores){
  let hp = 0, ht = 0, lp = 0, lt = 0, up = 0, ut = 0;
  userTraitCombo.forEach((traitId) => {
    estTraitScores[traitId].ht && (hp+=estTraitScores[traitId].hp/estTraitScores[traitId].ht);
    estTraitScores[traitId].lt && (lp+=estTraitScores[traitId].lp/estTraitScores[traitId].lt);
    estTraitScores[traitId].ut && (up+=estTraitScores[traitId].up/estTraitScores[traitId].ut);
    ht += estTraitScores[traitId].ht
    lt += estTraitScores[traitId].lt
    ut += estTraitScores[traitId].ut;
  });
  let histScore = ht === 0 ? 0 : Math.round(hp/userTraitCombo.length*10);
  let liveScore = lt === 0 ? 0 : Math.round(lp/userTraitCombo.length*10);
  let userScore = ut === 0 ? 2 : Math.round(up/userTraitCombo.length);

  return {histScore, liveScore, userScore};
};

//Calculate userComboScores for all establishments
export function allEstUserComboScores(estabs,userTraitCombo,allTraits){
  var userComboScores = {};
  _.each(estabs, (estab) => {
    userComboScores[estab.id] = updateEstUserComboScores(userTraitCombo,allTraits[estab.id]);
  })
  return userComboScores;
};











