//Express server
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http       = require('http').Server(app);
var io         = require('socket.io')(http);

var userCtrl   = require('../users/userController.js');
var voteCtrl   = require('../votes/voteController.js');
var authCtrl   = require('../auth/authController.js');
var estabCtrl  = require('../establishments/establishmentController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Auth routes
app.post('/signup', authCtrl.signup );
app.post('/login', authCtrl.login );

// socket listeners
io.on('connect', function(socket){
  console.log('user connected' );

  socket.on('Get establishments',function(data){
    //data is an object {userId, zones: [array of zones]}
    estabCtrl.getEstabsInZones(data.userId,data.zones).then(function(estabsInZones){
      socket.emit('New Establishments', {establishments: estabsInZones});
      // voteCtrl.getVotesInZones(data.zones).then(function(votesInZones){
      //   voteCtrl.getAllUserVotesInZones(data.userId,data.zones).then(function(userVotes){
      //     socket.emit('New Establishments', {establishments:estabsInZones, votes:votesInZones, userVotes: });    
      //   })
      // })
    })
  });

  socket.on('setUserTraits', function (data){
    //data is an object {userId, traitCombo}
    // note - client will set traits locally, so no need to send back
    userCtrl.setUserTraits(data);
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