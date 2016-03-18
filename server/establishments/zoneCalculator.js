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

module.exports = zoneCalculator;