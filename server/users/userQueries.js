// user queries
var models = require('../config/db.js');
var users = models.Users;
var users_traits = models.Users_Traits;

var jwt = require( 'jwt-simple' );
var Q = require('q');
var bcrypt = require('bcryptjs');


// helpers:
var getAllUsers = function () {
  return users.findAll({});
};

// var hashPass = function(pass, null, null){
//   var cipher = Q.Promise(bcrypt.hash);
//   return cipher();
// };

// add user
var addUser = function (userDetails) {
  // CREATE USER IF DOESN'T EXIST
  // console.log(userDetails);
  // // var salt = 'dsffwer';
  // // bcrypt.hash(userDetails.password, 22, 10, function(err, result) {
  //   console.log(result);
    users
      .findOrCreate({where:{
        userName:userDetails.userName},
        defaults:{name: userDetails.name,
        email: userDetails.email,
        salt: 'dsffwer',
        password: userDetails.password
      }})
      .spread(function(user, created){
        if (!created) {
          // response.send("account already exists, should redirect to login");
        } else {
            // add userDefaults to user_traits
            updateUserInfo(user.id, userDetails.traits)
              .then(function (user) {
                return user;
              });
        }
      })
      .catch(function(err){
        console.error(err);
      });
  // }); // closes hash
  // console.log(cipher);
  // cipher()
};
// get if attempted password is correct for userName ...
var checkPass = function (userName, attPass) {
  return function() {
    users.findOne({where: {userName: userName}}).then(function(user) {
      if (!user) {
        return false;
      }
      bcrypt.compare(attPass, user.password, function(err, match) {
        if(err) {
          return "error";
        } else {
          return match;
        }
      });
    });
  };
};
// returns the info for that user
var getUserInfo = function (userName) {
  users.findOne(
    {where:{userName:userName}})
    .then(function(user){
      return user;
    });
};
// TODO: fix the damn thing
var updateUserInfo = function (userId, newTraits) {
  console.log(users_traits.findAll());
  users_traits.findAll(
    {where:{userId:userId}})
    .then(function(userTraits){
      if(userTraits.length === 0) {
        newTraits.forEach(function(trait, index){
          users_traits.create(
            {
              traitId:newTraits[index],
              userId:userId,
              industryId:1
            });
        });
      } else {
        newTraits.forEach(function(trait, index){
          users_traits.update(
            {traitId:newTraits[index]},
            {where:{id:trait.id}
          });
        });
      }
  });
};

module.exports = {
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  addUser: addUser,
  checkPass: checkPass,
  getAllUsers: getAllUsers
};
