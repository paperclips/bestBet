// auth controller
var userCtrl   = require('./userController.js');
var jwt = require( 'jwt-simple' );

function signup (req, res) {
	console.log('req.body is ', req.body);
  console.log('user trying to sign up');
  var userName = req.body.userName;
  var traitCombo = req.body.traitCombo; //integer
  userCtrl.findUser(userName).then(function(oldUser){
    if(oldUser){
      console.log('username is take');
	res.status(401).send({error: 'This username is taken'});
    } else {
	console.log('will create a user..', req.body);
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
  console.log('user trying to login');
	console.log(req.body,'<<user info');  
var userName = req.body.userName;
  var password = req.body.password;
  userCtrl.checkPass(userName, password,function(match,user){
    if(!match){
	console.log('pw doesnt match');
      res.status(401).send({error:'Incorrect username or password'})
    } else {
console.log('pw matched');
      //Get user preferences
      userCtrl.getUserTraits(user.id).then(function(traitRecord){
        var comboArr = traitRecord.traitCombo.toString().split('').map(function(digit){ 
          return 1 * digit; //conver to array with 1-3 integers inside
        });
        var token = jwt.encode(userName, 'secret');
	console.log('about to res sent 200');        
res.status(200).send({id: user.id, name: user.name, userName: user.userName, token: token, traitCombo: comboArr}); //array
//res.status(200).send('hello?');
      })
    }
  })
};

module.exports = {
  signup: signup,
  login: login
};
