// auth controller
var userCtrl   = require('./userController.js');
var jwt = require( 'jwt-simple' );

function signup (req, res) {
  var userName = req.body.userName;
  var traitCombo = req.body.traitCombo; //integer
  userCtrl.findUser(userName).then(function(oldUser){
    if(oldUser){
      res.status(401).send({error: 'This username is taken'});
    } else {
      userCtrl.addUser(req.body).then(function(user){
        var token = jwt.encode(user.userName, 'secret');
        console.log(user, 'NEW USER!!!');
        userCtrl.setUserTraits({userId: user.id, traitCombo: traitCombo});
        var comboArr = traitCombo.toString().split('').map(function(digit){
          return 1 * digit; //conver to array with 1-3 integers inside
        });
        res.status(200).send({id: user.id, name: user.name, userName: user.userName, token: token, traitCombo: comboArr}); //array
      })
    }
  })
};

function login (req, res) {
  var userName = req.body.userName;
  var password = req.body.password;
  userCtrl.checkPass(userName, password,function(match,user){
    if(!match){
      res.status(401).send({error:'Incorrect username or password'})
    } else {
      //Get user preferences
      userCtrl.getUserTraits(user.id).then(function(traitRecord){
        var comboArr = traitRecord.traitCombo.toString().split('').map(function(digit){ 
          return 1 * digit; //conver to array with 1-3 integers inside
        });
        var token = jwt.encode(userName, 'secret');
        res.status(200).send({id: user.id, name: user.name, userName: user.userName, token: token, traitCombo: comboArr}); //array
      })
    }
  })
};

module.exports = {
  signup: signup,
  login: login
};