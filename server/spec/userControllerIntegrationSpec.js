var http        = require('../server.js');
var expect      = require('chai').expect;
var request     = require('supertest');
var userCtrl    = require('../controllers/userController.js');
var Sequelize   = require('sequelize');

var LOCAL_DB = {
  name: 'paperclipsdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: false}
};

var sequelize = new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);
var model        = require('../config/schemas.js')(Sequelize,sequelize);
 
describe("user signup and signin", function () {
  before(function (done) {
    console.log('starting test...');
    done();
  })

    var newUser = { name: 'testuser', userName: "Jackie", password:"jackiepw" };
    it("should created a user in db if username is not taken", function (done) {
      userCtrl.findUser(newUser.userName).then(function(user){
        if(!user){
          console.log('userName not taken, will proceed with user registration');
          return userCtrl.addUser(newUser)
          .then(function(u){
            console.log('new user reg done')
            done();
          })
        }else{
          console.error('userName already taken, please change to a different username');
          done();
        }
      }, function(err){
        console.error(err);
      });
    });

    it("should allow user to login if username and password are entered correctly", function (done) {
      userCtrl.findUser(newUser.userName).then(function(user){
        if(!user){
          console.log('you have not registered yet');
        }else{
          return userCtrl.checkPass(newUser.userName, newUser.password, function(){
            console.log('password matched, user shall proceed');
            done();
          })
        }
      }, function(err){
        console.error(err);
      });
    });

    it("should allow throw error if password does not match", function (done) {
      var newUser = { name: 'testuser1', userName: "Jackie", password:"wrongpw" };
      userCtrl.findUser(newUser.userName).then(function(user){
        if(!user){
          console.log('you have not registered yet');
        }else{
          return userCtrl.checkPass(newUser.userName, newUser.password, function(n){
            if(n != false){
              console.log('password matched');
            } else {
              console.log("pw not matching");
              done();
            }
          })
        }
      }, function(err){
        console.error(err);
      });
    });

});

