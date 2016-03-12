// routes

// auth
  // singup - post
    // user signs up
    // body is name, password, location, default TRAIT list...
      // if username doesn't exist,
        //we add user to the user database, add Users_Traits connections to Users_Traits Join table
        // GO TO SIGN USER IN FUNC

  // signin - post
    // user signs in
    // body is user name password, location
      // if user exists && password is correct
      // SIGN_USER_IN_FUNC:
        // CREATE JWOT
        // GET_RELEVANT_DATA_FUNC:
          // add user's SOCKETID to zoneHandler matrix
          // LOAD establishment data (from establishment table in DB) for appropriate zones
          // LOAD vote data (from vote table in DB) for appropriate establishments
          // send back JWOT and relevant establishment data and relevant vote data

// socket listeners

  // user moves to a new zone
    // listener recieves new zone # (and knows socketId)
    // user controller
      // calls zoneHandler service
        // zoneHandler service DELETES socketId from old zone, adds socketId to new zone
        // add user's SOCKETID to zoneHandler matrix
        // GET_RELEVANT_DATA_FUNC:
          // LOAD establishment data (from establishment table in DB) for appropriate zones
          // LOAD vote data (from vote table in DB) for appropriate establishments
          // send back JWOT and relevant establishment data and relevant vote data

  // user changes their default traits
    // listener recieves userId and newTraits...
    // we remove any from the Users_Traits join table... and add any new to that table
    // <call> GET_RELEVANT_DATA_FUNC:
      // LOAD establishment data (from establishment table in DB) for appropriate zones
      // LOAD vote data (from vote table in DB) for appropriate establishments
      // send back JWOT and relevant establishment data and relevant vote data

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
