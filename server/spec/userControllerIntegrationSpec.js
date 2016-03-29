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
 
describe("should create an user if username not yet taken", function () {
    var mockResponse = function (callback) { return { send: callback }; };
    var newUser = { name: 'testuser13', userName: "jackiiiieeee", password:"jackiiiieeee" };

    it("should find created users", function (done) {
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
});

