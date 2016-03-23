/*
This code
1) Creates "Restaurant" record with id=1 in Industries table,
2) Creates 9 traits in the Traits table,
3) Pulls 20 restaurants using Yelp API and saves them into Establishments table

To run, uncomment code below and restart server. Once database is updated, comment out code

*/

var Yelp = require('yelp');
var db = require('../config/db');

var zoneCalculator = require('../services/zoneHandler').zoneCalculator;
var Establishments = db.Establishments;
var EstablishmentHistories = db.EstablishmentHistories;
var Traits = db.Traits;
var traitNames = ['Good Food', 'Good Drinks', 'Good Deal', 'Not Noisy', 'Not Crowded', 'No Wait','Good Service','Upscale', 'Veggie Friendly'];
var traitSensitivities = [false, false, false, true, true, true, true, false, false];

var popTraits = function () {
  traitNames.forEach(function(trait, index){
    Traits.findOrCreate({where:{name:trait, timeSensitive:traitSensitivities[index]}});
  });
};
popTraits();

// Save 20 restaurants into Establishments
var yelp = new Yelp({
  consumer_key: 'FW8Mc7pREwM4wb6tDXCqQQ',
  consumer_secret: 'NWuduUH_hygivccfEywP51nEzA0',
  token: 'SEDzj2ONG-liWR0U-0MfmWlYXl2NM-tP',
  token_secret: 'YcJRVQiAt4m9unwCH_VK1JhLAjo'
});

var zipcodes = [94107];
//, 94102,94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158];
var offsets = [0,20];
//20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980];
          console.log("ylp ");

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
             zoneNumber: zoneNumber
          }})
          .then(function(estab){
            EstablishmentHistories.findOrCreate({where:{establishmentId:estab.id}
              defaults:{
                zoneNumber:zoneNumber, 
                trait1Pos: Math.floor(2*item.rating)*item.review_count,
                trait1Tot: item.review_count*10,
                trait2Pos: Math.floor(2*item.rating)*item.review_count,
                trait2Tot: item.review_count*10,
                trait3Pos: Math.floor(2*item.rating)*item.review_count,
                trait3Tot: item.review_count*10,
                trait4Pos: Math.floor(2*item.rating)*item.review_count,
                trait4Tot: item.review_count*10,
                trait5Pos: Math.floor(2*item.rating)*item.review_count,
                trait5Tot: item.review_count*10,
                trait6Pos: Math.floor(2*item.rating)*item.review_count,
                trait6Tot: item.review_count*10,
                trait7Pos: Math.floor(2*item.rating)*item.review_count,
                trait7Tot: item.review_count*10,
                trait8Pos: Math.floor(2*item.rating)*item.review_count,
                trait8Tot: item.review_count*10,
                trait9Pos: Math.floor(2*item.rating)*item.review_count,
                trait9Tot: item.review_count*10
              }
            });
          }) 
        })
      })
      .catch(function(err){
        console.error(err);
      })
  })
});

