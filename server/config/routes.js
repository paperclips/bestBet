//Express server
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http       = require('http').Server(app);
var io         = require('socket.io')(http);

var userCtrl   = require('../controllers/userController.js');
var voteCtrl   = require('../controllers/voteController.js');
var authCtrl   = require('../controllers/authController.js');
var estabCtrl  = require('../controllers/estabController.js');

//app.set('domain', '10.8.30.75');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Auth routes
app.post('/signup', authCtrl.signup );
app.post('/login', authCtrl.login );

// socket listeners
io.on('connect', function(socket){
  console.log('user connected' );

  socket.on('Get Establishments',function(data){
    //data is an object {userId, zones: [array of zones]}
    estabCtrl.getEstabsInZones(data.userId,data.zones).then(function(estabs){
      var estabObject = {};
      for(var i = 0; i<estabs.length;i++){
        estabObject[estabs[i].id] = estabs[i];
        if(i === estabs.length-1){
          socket.emit('New Establishments', estabObject);
        }
      }
    })
  });

  socket.on('setUserTraits', function (data){
    // data is an object {userId, traitCombo as integer}
    userCtrl.setUserTraits(data);
  });

  socket.on('joinRooms', function (newZones){
    newZones.forEach(function(zone){
      socket.join(zone);
    });
  });

  socket.on('leaveRooms', function (oldZones){
    oldZones.forEach(function(zone){
      socket.leave(zone);
    });
  });

  // incoming vote
  socket.on('userVoted', function (voteDetails){
    //voteDetails is an object {establishmentId, userId, time, zoneNumber, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
    //Immediately emit new vote to all users in the vote zone
    io.to(voteDetails.zoneNumber).emit('voteAdded', voteDetails);
    voteCtrl.addVotes(voteDetails);
  });

  socket.on('disconnect', function() {
    console.log( 'a user left' );
  });
});

exports = module.exports = http;