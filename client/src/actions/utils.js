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

export function calcAllScores(estabsObj,userCombo){
  
  let allTraits = {};
  let userComboScore = {};

  _.each(estabsObj, (estab) => {

    let traitScores = {1:{lp:0, lt:0, hp:estab.trait1Pos, ht:estab.trait1Tot, up:0, ut:0},
                       2:{lp:0, lt:0, hp:estab.trait2Pos, ht:estab.trait2Tot, up:0, ut:0},
                       3:{lp:0, lt:0, hp:estab.trait3Pos, ht:estab.trait3Tot, up:0, ut:0},
                       4:{lp:0, lt:0, hp:estab.trait4Pos, ht:estab.trait4Tot, up:0, ut:0},
                       5:{lp:0, lt:0, hp:estab.trait5Pos, ht:estab.trait5Tot, up:0, ut:0},
                       6:{lp:0, lt:0, hp:estab.trait6Pos, ht:estab.trait6Tot, up:0, ut:0},
                       7:{lp:0, lt:0, hp:estab.trait7Pos, ht:estab.trait7Tot, up:0, ut:0},
                       8:{lp:0, lt:0, hp:estab.trait8Pos, ht:estab.trait8Tot, up:0, ut:0},
                       9:{lp:0, lt:0, hp:estab.trait9Pos, ht:estab.trait9Tot, up:0, ut:0}};

    estab.Votes.forEach((vote) => {
      traitScores[vote.traitId].lp+=vote.voteValue;
      traitScores[vote.traitId].lt++;
    });
    estab.userVotes.forEach((vote) => {
      traitScores[vote.traitId].up+=vote.voteValue;
      traitScores[vote.traitId].ut++;
    });
    allTraits[estab.id] = traitScores;

    //Combined scores for user traits
    let hp = 0, ht = 0, lp = 0, lt = 0, up = 0, ut = 0;
    userCombo.forEach((traitId) => {
      hp+=traitScores[traitId].hp;
      ht+=traitScores[traitId].ht;
      lp+=traitScores[traitId].lp;
      lt+=traitScores[traitId].lt;
      up+=traitScores[traitId].up;
      ut+=traitScores[traitId].ut;
    });
    let histScore = ht === 0 ? 0 : Math.round(hp/ht*10);
    let liveScore = lt === 0 ? 0 : Math.round(lp/lt*10);
    let userScore = ut === 0 ? 2 : Math.round(up/ut);

    userComboScore[estab.id] = {histScore, liveScore, userScore};
  });

  return {allTraits, userComboScore};
};


export function updateScores(userId, allTraits, userTraitCombo, voteData){
  if(allTraits){
    Object.keys(voteData.votes).forEach((traitId) => {
      allTraits[traitId].lp+= voteData.votes[traitId];
      allTraits[traitId].lt++;
      allTraits[traitId].hp+= voteData.votes[traitId];
      allTraits[traitId].ht++;
      if(userId === voteData.userId){
        allTraits[traitId].up+= voteData.votes[traitId];
        allTraits[traitId].ut++;
      }
    });
  };
  let hp = 0, ht = 0, lp = 0, lt = 0, up = 0, ut = 0;
  userTraitCombo.forEach((traitId) => {
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
  
  return {allTraits, userComboScore}
};
