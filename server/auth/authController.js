// auth controller
var userCtrl   = require('../users/userController.js');
var jwt = require( 'jwt-simple' );

function signup (req, res) {
  var userName = req.body.userName;
  userCtrl.findUser(userName).then(function(user){
    if(user){
      res.status(401).json({error: 'This username is taken'});
    } else {
      userCtrl.addUser(req.body).then(function(user){
        var token = jwt.encode(user.userName, 'secret');
        res.send(200,{id: user.id, name: user.name, userName: user.userName, token: token});  
      })
    }
  })
};

function login (req, res) {
  var userName = req.body.userName;
  var password = req.body.password;

  userCtrl.checkPass(userName, password,function(match,user){
    if(!match){
      res.status(401).json({error:'Incorrect username or password'})
    } else {
      //Get user preferences
      userCtrl.getUserTraits.then(function(traitCombo){
        var token = jwt.encode(userName, 'secret');
        res.send(200,{id: user.id, name: user.name, userName: user.userName, token: token, traitCombo: traitCombo});    
      })
    }
  })
};

module.exports = {
  signup: signup,
  login: login
};