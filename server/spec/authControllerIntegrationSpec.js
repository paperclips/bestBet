var chai = require('chai');
var chaiHttp = require('chai-http');
var http        = require('../server.js');
var should = chai.should();
var Sequelize   = require('sequelize');

var LOCAL_DB = {
  name: 'paperclipsdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: false}
};

var sequelize = new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);
var model        = require('../config/schemas.js')(Sequelize,sequelize);

chai.use(chaiHttp);

var token = "";

describe('Test server end points', function() {

  before(function (done) {
      chai.request(http)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send({name: "Brian", "userName": "Brian", "password": "Brian", traitCombo: 456})
        .end(function(err, res){
          token = res.body.token;
          done();
        });
  })

  it('should be able to sign up', function(done) {
    chai.request(http)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({name: "Pavel", "userName": "Pavel", "password": "12345", traitCombo: 789})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should throw error when creating account with existing username', function(done) {
    chai.request(http)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({name: "Pavel", "userName": "Pavel", "password": "12345", traitCombo: 789})
      .end(function(err, res){
         res.should.have.status(401);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('error');
         res.body.error.should.equal('This username is taken');
         done();
       });
  });

  it('should be able to login if username and password are entered correctly', function(done) {
    chai.request(http)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({name: "Pavel", "userName": "Pavel", "password": "12345"})
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('token');
         done();
      });
  });

  after(function(done) {
    model.Users.destroy({where: {"userName": "Brian"}})
    .then(function(){
      console.log('deleted tester Brian')
    }, function(err) {
      console.log("CANNOT DELETE Brian");
      console.error(err)
    })
    
    model.Users.destroy({where: {"userName": "Pavel"}})
    .then(function(){
      console.log('deleted tester Pavel')
    }, function(err) {
      console.log("CANNOT DELETE Pavel");
      console.error(err)
    })
    done();
  });
});
