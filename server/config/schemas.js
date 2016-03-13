// establishment schema
var Sequelize = require('sequelize');
var db = require('../config/db');

var Users = db.define('Users', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userName: {type: Sequelize.STRING, unique: true, notNull: true},
    name: {type: Sequelize.STRING, notNull: true},
    email: {type: Sequelize.STRING, unique: true, notNull: true},
    salt: {type: Sequelize.STRING, notNull: true},
    password: {type: Sequelize.STRING, notNull: true},
  }, { timestamps: false });

var Establishments = db.define('Establishments', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: Sequelize.STRING, notNull: true},
    imageUrl: {type: Sequelize.STRING},
    yelpUrl: {type: Sequelize.STRING},
    yelpId: {type: Sequelize.STRING},
    yelpRating: {type: Sequelize.FLOAT},
    yelpReviewCount: {type: Sequelize.INTEGER},
    genreId: {type: Sequelize.INTEGER},
    zoneLat: {type: Sequelize.INTEGER},
    zoneLon: {type: Sequelize.INTEGER},
    latitude: {type: Sequelize.FLOAT},
    longitude: {type: Sequelize.FLOAT},
    address: {type: Sequelize.STRING},
    phoneNumber: {type: Sequelize.STRING},
    industryId: {type: Sequelize.INTEGER},
  }, { timestamps: false });

var Traits = db.define('Traits', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: Sequelize.STRING, notNull: true},
    timeSensitive: {type: Sequelize.BOOLEAN, notNull: true}
  }, { timestamps: false });

var Votes = db.define('Votes', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    establishmentId: {type: Sequelize.INTEGER, notNull: true},
    traitId: {type: Sequelize.INTEGER, notNull: true},
    userId: {type: Sequelize.INTEGER, notNull: true},
    voteValue: {type: Sequelize.BOOLEAN, notNull: true},
    time: {type: Sequelize.DATE, notNull: true},
    zoneLat: {type: Sequelize.INTEGER, notNull: true},
    zoneLon: {type: Sequelize.INTEGER, notNull: true}
  }, { timestamps: false });

var Users_Traits = db.define('Users_Traits', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    traitId: {type: Sequelize.INTEGER, notNull: true},
    userId: {type: Sequelize.INTEGER, notNull: true},
  }, { timestamps: false });

var Genres = db.define('Genres', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: Sequelize.STRING, notNull: true},
    industryId: {type: Sequelize.INTEGER}
  }, { timestamps: false });

var YelpCategories_Genres = db.define('YelpCategories_Genres', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    yelpCategory: {type: Sequelize.STRING, notNull: true},
    genreId: {type: Sequelize.INTEGER, notNull: true}
  }, { timestamps: false });

var Industries = db.define('Industries', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: Sequelize.STRING, notNull: true},
  }, { timestamps: false });

Establishments.hasOne(Genres, { foreignKey: 'genreId' });
Establishments.hasOne(Industries, { foreignKey: 'industryId' });
Votes.hasOne(Establishments, { foreignKey: 'establishmentId' });
Votes.hasOne(Traits, { foreignKey: 'traitId' });
Votes.hasOne(Users, { foreignKey: 'userId' });
Users.belongsToMany(Traits, { through: 'Users_Traits', foreignKey: 'userId' });
Traits.belongsToMany(Users, { through: 'Users_Traits', foreignKey: 'traitId' });
Genres.hasOne(Industries, { foreignKey: 'industryId' });
YelpCategories_Genres.hasOne(Genres, { foreignKey: 'genreId' });

module.exports = {
  Users: Users,
  Establishments: Establishments,
  Traits: Traits,
  Votes: Votes,
  Users_Traits: Users_Traits,
  Genres: Genres,
  YelpCategories_Genres: YelpCategories_Genres,
  Industries: Industries
};


