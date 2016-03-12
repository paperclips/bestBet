// db configuration
var Sequelize = require('sequelize');

var LOCAL_DB = {
  name: 'paperclipsdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: console.log }
};

var db = new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);

db.sync(); //Create database and tables if they don't exist

module.exports = db;