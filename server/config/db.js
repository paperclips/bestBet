// db configuration
var Sequelize = require('sequelize');

var LOCAL_DB = {
  name: 'paperclipsdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: console.log }
};

var db = new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);

var models = require('./schemas')(Sequelize,db); //Run schemas function

db.sync(); //Create tables if they don't exist

module.exports = models;