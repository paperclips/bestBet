//Express server
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io-client');
var NUM_OF_ROWS = require('./services/zoneHandler').NUM_OF_ROWS;
var NUM_OF_COLS = require('./services/zoneHandler').NUM_OF_COLS;

//var SERVER_URL = 'http://104.131.12.172:3000';
var SERVER_URL = 'http://localhost:3000';

// Connect to server via socket
var socket = io.connect(SERVER_URL, { jsonp: false });

socket.on('voteAdded',function(voteDetails){
  //vote object is {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  console.log('Received vote ', 'and userId:',voteDetails.userId,'at',voteDetails.time);
});

socket.on('New Establishments',function(estabs){
  //estabs object is {establishments:estabObject}
  console.log('Received estabs sent to bot socket; Total estabs received', Object.keys(estabs.establishments).length);
});

var createNewVote = function(){
  //vote object is {establishmentId, userId, time, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var vote = {};
  //zoneNumbers around Hack Reactor for live demo
  vote.establishmentId = 1 + Math.floor(Math.random()*1500);
  vote.userId = Math.floor(Math.random()*40+1);
  vote.time = new Date();
  vote.votes = {};

  for(var i=1;i<=9;i++){
    vote.votes[i] = Math.round(Math.random());
  }
  socket.emit('userVoted',vote);
  console.log(vote.userId, 'voted on', vote.establishmentId);
};

var requestEstabs = function(){
  //request object is {userId, zones: [array of zones]}
  var request = {};
  request.userId = Math.floor(Math.random()*20+1);
  request.zones = [];
  for(var i=1;i<=9;i++){
    while(true){
      var zone = Math.floor(Math.random()*NUM_OF_ROWS)*1000 + Math.floor(Math.random()*NUM_OF_COLS);
      if(request.zones.indexOf(zone) === -1){
        request.zones.push(zone);
        break;
      }
    }
  };
  socket.emit('Get Establishments', request);
};


//Bot will live on port 8000
var port = process.env.PORT || 8000;

//Start the bot:
http.listen(port);
console.log('botServer listening on port ' + port);
setInterval(createNewVote,500);
//setInterval(requestEstabs,1000);
