/*
This code
-- Creates 9 traits in the Traits table,
-- Pulls 80 restaurants using Yelp API and saves them into Establishments table

To run, uncomment code below and restart server. Once database is updated, comment out code

*/

var Yelp = require('yelp');
var db = require('../config/db');

var zoneCalculator = require('../services/zoneHandler').zoneCalculator;
var Establishments = db.Establishments;
var Traits = db.Traits;
var Votes = db.Votes;

var traitNames = ['Good Food', 'Good Drinks', 'Good Deal', 'Not Noisy', 'Not Crowded', 'No Wait','Good Service','Upscale', 'Veggie Friendly'];
var traitSensitivities = [false, false, false, true, true, true, true, false, false];


//Drop tables and create them. Need to drop Votes table to make sure votes are sync to totals
Establishments.sync({force: true});
Votes.sync({force: true});


var popTraits = function () {
  traitNames.forEach(function(trait, index){
    Traits.findOrCreate({where:{name:trait, timeSensitive:traitSensitivities[index]}});
  });
};
popTraits();

// Save 20 restaurants into Establishments
var yelp = new Yelp({
  consumer_key: 'gsjk0o7MGSveWE1fl3XDJQ',
  consumer_secret: 'jENexVIGC2-ho2MPKDCvISyRfPU',
  token: 'uosUcU25he8AlgqM8paqwzj-j4mpkIhl',
  token_secret: 'myAMTAkatscCizvq2z3cSffp0uc'
});

var zipcodes = [94102,94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158];
//94102,94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158];
var offsets = [0,20,40,60,80,100,120,140,160,180,200];
//0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980];

zipcodes.forEach(function(zipcode){

  offsets.forEach(function(offset){
    yelp.search({ term: '', location: zipcode, category_filter: 'restaurants',offset: offset, limit: 20})
      .then(function (data) {
        data.businesses.forEach(function(item){
          var zoneNumber = zoneCalculator(item.location.coordinate.latitude, item.location.coordinate.longitude);
          Establishments.findOrCreate({
            where: {yelpId: item.id},
            defaults:{
             name: item.name,
             imageUrl: item.image_url,
             yelpUrl: item.url,
             yelpId: item.id,
             yelpCategory: item.categories[0][1],
             yelpRating: item.rating,
             yelpReviewCount: item.review_count,
             latitude: item.location.coordinate.latitude,
             longitude: item.location.coordinate.longitude,
             address: item.location.address[0] + ', ' + item.location.city + ', ' + item.location.state_code + ' ' + item.location.postal_code,
             phoneNumber: item.display_phone,
             zoneNumber: zoneNumber,
             trait1Pos: Math.floor(Math.random()*1000),
             trait1Tot: 1000,
             trait2Pos: Math.floor(Math.random()*1000),
             trait2Tot: 1000,
             trait3Pos: Math.floor(Math.random()*1000),
             trait3Tot: 1000,
             trait4Pos: Math.floor(Math.random()*1000),
             trait4Tot: 1000,
             trait5Pos: Math.floor(Math.random()*1000),
             trait5Tot: 1000,
             trait6Pos: Math.floor(Math.random()*1000),
             trait6Tot: 1000,
             trait7Pos: Math.floor(Math.random()*1000),
             trait7Tot: 1000,
             trait8Pos: Math.floor(Math.random()*1000),
             trait8Tot: 1000,
             trait9Pos: Math.floor(Math.random()*1000),
             trait9Tot: 1000
            },
            raw:true
          }) 
        })
      })
      .catch(function(err){
        console.error(err);
      })
  })
});

