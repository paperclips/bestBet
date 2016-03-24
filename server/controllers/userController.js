var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var db = require('../config/db');
var Users = db.Users;
var Users_Traits = db.Users_Traits;

var findUser = function(userName){
  return Users.findOne({where:{userName:userName},raw:true});
};

var addUser = function (userDetails) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(userDetails.password, null,null).then(function(hash) {
    return Users.create({userName: userDetails.userName,
                         name: userDetails.name,
                         password: hash})
  });
};

var checkPass = function (userName, attPassword, callback) {
  findUser(userName).then(function(user) {
    if (!user) {
      return callback(false);
    };
    bcrypt.compare(attPassword, user.password, function(err,match){
      match ? callback(match,user) : callback(match);
    })
  });
};

var getUserTraits = function(userId){
  return Users_Traits.findOne({where: {userId: userId}, raw: true, attributes: ['traitCombo']});
};

var setUserTraits = function(data){
  return Users_Traits.findOrCreate({where: {userId: data.userId}, raw: true, defaults:{traitCombo: data.traitCombo}})
              .spread(function(user, created) {
                //If user already exists, update traits
                if(!created){
                  Users_Traits.update({traitCombo: data.traitCombo}, {where: {userId: data.userId}, raw: true})
                              .then(function(result){
                                console.log('User traits updated:',result);
                              }, function(error){
                                console.log('User traits update failed:',error);
                              });
                }
              })
};

module.exports = {
  findUser: findUser,
  addUser: addUser,
  checkPass: checkPass,
  getUserTraits: getUserTraits,
  setUserTraits: setUserTraits
};
