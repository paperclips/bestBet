// query and controller testers

/*
This code
1) Creates "50 fake users" records
2) Give users default traits
// for now everyone is in the same zone
*/

var db          = require('../config/db');
var userQueries = require('./userQueries.js');

var firstNames = ['joe','bob','jon','al','kim','joan','julie','bee','ann','beth'];
var lastNames = ['a','b','c','d','e','f','g','h','i','j'];
var createFakeUsers = function(num) {
  var theUsers = [];
  var y = num-1;
  for (var x = 0; x < num; x++) {
    theUser = {};
    theUser.userName = 'user' + x;
    theUser.name = firstNames[x%10] +' '+ lastNames[y%10];
    theUser.email = '@'+x;
    theUser.salt = 1;
    theUser.password = '1';
    theUser.traits = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)];
    y--;
    userQueries.addUser(theUser);
  }
};

createFakeUsers(50);
