/*
This code
1) Creates "Restaurant" record with id=1 in Industries,
4) Pulls 20 restaurants using Yelp API and saves them into Establishments table

To run, uncomment code below and restart server. Once database is updated, comment out code

*/

var Yelp = require('yelp');
var db = require('../config/db');

var Industries = db.Industries;
var Establishments = db.Establishments;
var Traits = db.Traits;

// Add Restaurant industry
Industries.findOrCreate({where: {name: 'Restaurants'}})
  .spread(function(industry, created) {
    console.log(industry.get({
      plain: true
    }))
    console.log(created)
  });

var traitNames = ['Good Food', 'Good Drinks', 'Good Deal', 'Not Noisy', 'Not Crowded', 'No Wait','Good Service','Upscale', 'Veggie Friendly'];
var traitSensitivities = [false, false, false, true, true, true, true, false, false];

var popTraits = function () {
  traitNames.forEach(function(trait, index){
    Traits.findOrCreate({where:{name:trait,timeSensitive:traitSensitivities[index]}});
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

var zipcodes = [94107];//, 94102,94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158];
var offsets = [0];
//20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980];

zipcodes.forEach(function(zipcode){
  offsets.forEach(function(offset){
    yelp.search({ term: '', location: zipcode, category_filter: 'restaurants',offset: offset, limit: 20})
      .then(function (data) {
        data.businesses.forEach(function(item){
          Establishments.findOrCreate({where: {yelpId: item.id},
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
                                         industryId: 1,
                                         zoneNumber: 0,
                                       }
                                      });
        })
      }) // add create dummy object of rests
      .then(function(items){
        Establishments.findAll()
          .then(function(objects){
            var results = objects.map(function(object){
              var obj = object.dataValues; 
              obj.coordinate = {latitude: object.latitude, longitude: object.longitude};
              obj.ourRating = object.yelpRating*(20-(Math.random()*15));
              obj.zoneNumber = zoneCalculator(object.latitude, object.longitude);
              return obj;
            });
            console.log(results)
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  })
})


//Function that determines user zones and calculates what data to request from the server
var zoneCalculator = function(userLat,userLong){
  var northLimit = 37.827747, //Northernmost latitude of SF
      southLimit = 37.700643, //Southernmost latitude of SF
      westLimit = -122.517591, //Westernmost longitude of SF
      eastLimit = -122.356817, //Easternmost longitude of SF
      zoneVertical = 0.7, //Vertical size of the zone in miles
      zoneHorizontal = 0.4, //Horizontal size of the zone in miles
      verticalLength = 8.78, //Total vertical length of SF
      horizontalLength = 8.79; //Total horizontal length of SF

  if(userLat < southLimit || userLat > northLimit || userLong < westLimit || userLong > eastLimit){
    console.log('User is outside San Francisco');
    return undefined; //User is outside San Francisco
  }

  var verticalZones = Math.ceil(verticalLength / zoneVertical)-1; //13 vertical zones, zero indexed (0 to 12)
  var horizontalZones = Math.ceil(horizontalLength / zoneHorizontal)-1; //22 horizontal zones, zero indexed (0 to 21)

  var verticalStep = (southLimit - northLimit) / verticalZones;
  var horizontalStep = (westLimit - eastLimit) / horizontalZones;

  //Zones are numbered from top-left to bottom-right
  var userX = Math.floor(Math.abs((userLong - eastLimit) / horizontalStep));
  var userY = Math.floor(Math.abs((userLat - northLimit) / verticalStep));

  var zoneNumber = userY * 1000 + userX; //Convert to YYYXXX, where YYY - vertical zone, XXX - horizontal zone
  return zoneNumber;
};


//// Test function for zoneCalculator
// var northLimit = 37.827747, //Northernmost latitude of SF
//     southLimit = 37.700643, //Southernmost latitude of SF
//     westLimit = -122.517591, //Westernmost longitude of SF
//     eastLimit = -122.356817;

// var mult = 0;
// var mult2 = 0;
// var k=1;
// while(k+1){
//   k = zoneCalculator(northLimit+(southLimit-northLimit)/12*mult,eastLimit+(westLimit-eastLimit)/21*mult2);
//   console.log(k)
//   if(k <= 12000){
//     mult++;
//   }
//   mult2++;
// };
