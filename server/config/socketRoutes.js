// requirements
var JWT = require('jwt-simple');
var estCtrl = require('../establisments/establishmentController.js');
var userCtrl = require('../users/userController.js');
var voteCtrl = require('../votes/voteController.js');
var authCtrl = require('../auth/authController.js');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routes

// auth
  app.post('/api/signup', authCtrl.signup );
    // user signs up
    // body is name, password, location, default TRAIT list...
      // if username doesn't exist,
        //we add user to the user database, add Users_Traits connections to Users_Traits Join table
        // GO TO SIGN USER IN FUNC

  app.post('/api/signin', authCtrl.signin );
    // user signs in
    // body is user name password, location
      // if user exists && password is correct
        // SIGN_USER_IN_FUNC:
          // CREATE JWOT
          // calls zoneHandler_service_FUNC
            // zoneHandler service DELETES socketId from old zone, adds socketId to new zone
          // <calls> GET_RELEVANT_DATA_FUNC:
            // LOAD establishment data (from establishment table in DB) for appropriate zones
            // LOAD vote data (from vote table in DB) for appropriate establishments
            // send back JWOT and relevant establishment data and relevant vote data
  app.post('/api/users/signout', authCtrl.signout);

// socket listeners
io.on( 'connection' , function( socket ){
  console.log( 'connection estab' );

  // WHEN user moves to a new zone
  socket.on( 'userMoved', function(userDetails) {
    // listener recieves new zone # in userDetails(and knows socketId)
    console.log( 'a user moved ', userDetails);
    // WE call the move function, with the details, which will handle updating and sending back the info
    userCtrl.setUserZone(userDetails);
  });

  // WHEN user changes their default traits
  socket.on('userChangedTraits', function (userDetails){
    // listener recieves userId and newTraits...
    // we call the user change traits func
    userCtrl.changeDefaultTraits(userDetails);
  });
  // WHEN user votes on on and establishment
  socket.on('userVoted', function (voteDetails){
    // listener recieves userId, establishmentId, a set of tupals representing "Trait" and "voteValue"
    voteCtrl.
    // vote controller adds to vote table (with estabId, zone, etc.)
    // vote controller would have to EMIT to the appropriate socketIds that a new vote happened and send that info

  });

  // WHEN a user disconnects
  socket.on( 'disconnect', function() {
    console.log( 'a user left' );
  });


  });





  // user changes current trait combination
    // nothing happens server side, this is handled on the client side

  // user changes genre (cuisine)
    // nothing happens server side?? -- this is handled in how the map displays...
    // on the client side it filters which establishments to show data about based on the user's chosen "genre" (cuisine)

  // user checks into establishment (do we need this? should be automatic, not a user action)
    // nothing happens on serverside -
    // on client side, we allow the user to vote only on things they're close to (maybeee)
    // also on client side, I guess proximity to establishment will determine which estab the user is voting on

  // user selects a new industry
    // This, we have to reload a whole new set of establishments --
      // DIFFERENT INDUSTRIES WILL NOT BE AVAILABLE IN MVP

  // vote comes in on establishment
    // listener recieves userId, establishmentId, a set of tupals representing "Trait" and "voteValue"
      // vote controller adds to vote table (with estabId, zone, etc.)
      // vote controller would have to EMIT to the appropriate socketIds that a new vote happened and send that info

  // stretch: user adds a new category set (i.e. weekday lunch, datenight, saturday night with boys)
