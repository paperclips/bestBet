//Express server
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io-client');
//var io          = require('socket.io')(http);

var SERVER_URL = 'http://localhost:3000';

// Connect to server via socket
var socket = io.connect(SERVER_URL, { jsonp: false });

socket.on('voteAdded',function(voteDetails){
  //vote object is {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  console.log('Received vote sent to zone:', voteDetails.zoneNumber,'and userId:',voteDetails.userId,'at',voteDetails.time);
});

socket.on('New Establishments',function(estabs){
  //estabs object is {establishments:estabObject}
  console.log('Received estabs sent to bot socket; Total estabs received', Object.keys(estabs.establishments).length);
});

var createNewVote = function(){
  //vote object is {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
  var vote = {};
  vote.establishmentId = 204;//Math.floor(Math.random()*40+1);
  vote.userId = Math.floor(Math.random()*20+1);
  vote.zoneNumber = 4006;//Math.floor(Math.random()*13)*1000 + Math.floor(Math.random()*22);
  vote.time = new Date();
  vote.votes = {};

  socket.emit('joinRooms', [vote.zoneNumber]);
  
  for(var i=1;i<=9;i++){
    vote.votes[i] = Math.round(Math.random());
  }
  socket.emit('userVoted',vote);
};

var requestEstabs = function(){
  //request object is {userId, zones: [array of zones]}
  var request = {};
  request.userId = Math.floor(Math.random()*20+1);
  request.zones = [];
  for(var i=1;i<=9;i++){
    while(true){
      var zone = Math.floor(Math.random()*13)*1000 + Math.floor(Math.random()*22);
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
setInterval(createNewVote,1000);
setInterval(requestEstabs,1000);
