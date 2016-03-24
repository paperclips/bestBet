//This function creates all schemas and returns and object of Sequelize models

module.exports = function(Sequelize, db){
  var Users = db.define('Users', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: {type: Sequelize.STRING, notNull: true},
      userName: {type: Sequelize.STRING, unique: true, notNull: true},
      password: {type: Sequelize.STRING, notNull: true}
    }, { timestamps: false });

  var Establishments = db.define('Establishments', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: {type: Sequelize.STRING, notNull: true},
      imageUrl: {type: Sequelize.STRING},
      yelpUrl: {type: Sequelize.STRING},
      yelpId: {type: Sequelize.STRING},
      yelpCategory: {type: Sequelize.STRING},
      yelpRating: {type: Sequelize.FLOAT},
      yelpReviewCount: {type: Sequelize.INTEGER},
      latitude: {type: Sequelize.FLOAT},
      longitude: {type: Sequelize.FLOAT},
      address: {type: Sequelize.STRING},
      phoneNumber: {type: Sequelize.STRING},
      zoneNumber: {type: Sequelize.INTEGER}
    }, { timestamps: false });

    var EstablishmentHistories= db.define('EstablishmentHistories', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      establishmentId: {type: Sequelize.INTEGER, notNull: true},
      zoneNumber: {type: Sequelize.INTEGER},
      trait1Pos: {type: Sequelize.INTEGER},
      trait1Tot: {type: Sequelize.INTEGER},
      trait2Pos: {type: Sequelize.INTEGER},
      trait2Tot: {type: Sequelize.INTEGER},
      trait3Pos: {type: Sequelize.INTEGER},
      trait3Tot: {type: Sequelize.INTEGER},
      trait4Pos: {type: Sequelize.INTEGER},
      trait4Tot: {type: Sequelize.INTEGER},
      trait5Pos: {type: Sequelize.INTEGER},
      trait5Tot: {type: Sequelize.INTEGER},
      trait6Pos: {type: Sequelize.INTEGER},
      trait6Tot: {type: Sequelize.INTEGER},
      trait7Pos: {type: Sequelize.INTEGER},
      trait7Tot: {type: Sequelize.INTEGER},
      trait8Pos: {type: Sequelize.INTEGER},
      trait8Tot: {type: Sequelize.INTEGER},
      trait9Pos: {type: Sequelize.INTEGER},
      trait9Tot: {type: Sequelize.INTEGER},
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
      zoneNumber: {type: Sequelize.INTEGER, notNull: true}
    }, { timestamps: false });

  var Users_Traits = db.define('Users_Traits', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {type: Sequelize.INTEGER, notNull: true},
      traitCombo: {type: Sequelize.INTEGER, notNull: true},
    }, { timestamps: false });

  var Genres = db.define('Genres', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: {type: Sequelize.STRING, notNull: true}
    }, { timestamps: false });

  var YelpCategories_Genres = db.define('YelpCategories_Genres', {
      //id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      yelpCategory: {type: Sequelize.STRING, primaryKey: true, notNull: true},
      genreId: {type: Sequelize.INTEGER, notNull: true}
    }, { timestamps: false });

  /*
  belongsTo creates foreignKey on itself
  hasOne creates foreignKey on the target
  */

  Votes.belongsTo(Establishments, { foreignKey: 'establishmentId' });
  Establishments.hasMany(Votes, {foreignKey: 'establishmentId'});
  EstablishmentHistories.belongsTo(Establishments, { foreignKey: 'establishmentId' });
  Votes.belongsTo(Traits, { foreignKey: 'traitId' });
  Votes.belongsTo(Users, { foreignKey: 'userId' });
  Users_Traits.belongsTo(Users, { foreignKey: 'userId' });
  YelpCategories_Genres.belongsTo(Genres, { foreignKey: 'genreId' });

  return {
    Users: Users,
    Establishments: Establishments,
    EstablishmentHistories: EstablishmentHistories,
    Traits: Traits,
    Votes: Votes,
    Users_Traits: Users_Traits,
    Genres: Genres,
    YelpCategories_Genres: YelpCategories_Genres
  };
};
