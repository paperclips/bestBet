//functions that send post req to server w/ user info
import io from 'socket.io-client/socket.io';
import zoneHandler from './zoneHandler.js';

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

export function calcAllScores(estabObj,userTraits){
  let results = {};
  _.each(estabObj, (estab) => {
    let allVotes = estab.Votes.filter((vote) => userTraits.indexOf(vote.traitId)>-1)
    let posLive = allVotes.reduce((pos,vote) => pos+vote.voteValue,0);
    let totLive = allVotes.length;
    let allUserVotes = estab.userVotes.filter((vote) => userTraits.indexOf(vote.traitId)>-1)
    let posUser = allUserVotes.reduce((pos,vote) => pos+vote.voteValue,0);
    let totUser = allUserVotes.length;
    let posHist = 0;
    let totHist = 0;
    _.each(userTraits, (traitId) => {
      posHist += estab['trait'+traitId+'Pos'];
      totHist += estab['trait'+traitId+'Tot'];
    });
    let liveScore = totLive === 0 ? 0 : Math.round(posLive/totLive*10);
    let histScore = totHist === 0 ? 0 : Math.round(posHist/totHist*10);
    let userScore = totUser === 0 ? 2 : Math.round(posUser/totUser);
    let liveVotes = estab.Votes.length;
    results[estab.id] = {liveScore, histScore, userScore, liveVotes}
  })
  return results;
};