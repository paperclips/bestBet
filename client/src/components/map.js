var React = require('react-native');
var {
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} = React;

var MapView = require('react-native-maps');
var restaurants = require('./dummyEstablishments.js').dummyData;
var RestaurantMarkerView = require('./restaurantMarker.js');
var InfoCallout = require('./infoCallout');
var zoneCalculator = require('./zoneCalculator.js').zoneCalculator;

var styles = require('../assets/styles.js').mapStyles;

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.7832096;
const LONGITUDE = -122.4091516;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var DisplayLatLng = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      zone: zoneCalculator(37.7832096, -122.4091516),
      establishments: restaurants,
    };
  },
  show() {
        this.refs.m1.showCallout();
      },

  hide() {
    this.refs.m1.hideCallout();
  },

  onRegionChange(region) {
    this.setState({ region });
    this.setState({ zone: this.calcZone()});
  },
  calcZone() {
    var curRegion = this.state.region;
    return zoneCalculator(curRegion.latitude, curRegion.longitude);
  },

  jumpRandom() {
    this.setState({ region: this.randomRegion() });
  },

  animateRandom() {
    this.refs.map.animateToRegion(this.randomRegion());
  },

  randomRegion() {
    var { region } = this.state;
    return {
      ...this.state.region,
      latitude: region.latitude + (Math.random() - 0.5) * region.latitudeDelta / 2,
      longitude: region.longitude + (Math.random() - 0.5) * region.longitudeDelta / 2,
    };
  },

  inView (coords) {
    return (LATITUDE - LATITUDE_DELTA > coords.latitude < LATITUDE + LATITUDE_DELTA 
      && LONGITUDE - LONGITUDE_DELTA > coords.longitude < LONGITUDE + LONGITUDE_DELTA 
      )
  },
  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.state.establishments.map((establishment) => (
          <MapView.Marker key={establishment.id} coordinate={establishment.coordinate}>
            <RestaurantMarkerView 
              ref="m1"
              coordinate={establishment.coordinate}
              calloutOffset={{ x: 0, y: 0 }}
              calloutAnchor={{ x: 0, y: 0}}
            >
            </RestaurantMarkerView>
            <MapView.Callout tooltip>
              <InfoCallout>
                <Text style={{ fontWeight:'bold', color: 'white' }}>ZN: {establishment.zoneNumber} SC:{establishment.ourRating.toPrecision(2)}</Text>
              </InfoCallout>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}, ${this.state.zone}`}
          </Text>
        </View>
      </View>
    );
  },
});

// var zoneCalculator = function(userLat,userLong){
//   var northLimit = 37.827747, //Northernmost latitude of SF
//       southLimit = 37.700643, //Southernmost latitude of SF
//       westLimit = -122.517591, //Westernmost longitude of SF
//       eastLimit = -122.356817, //Easternmost longitude of SF
//       zoneVertical = 0.7, //Vertical size of the zone in miles
//       zoneHorizontal = 0.4, //Horizontal size of the zone in miles
//       verticalLength = 8.78, //Total vertical length of SF
//       horizontalLength = 8.79; //Total horizontal length of SF

//   if(userLat < southLimit || userLat > northLimit || userLong < westLimit || userLong > eastLimit){
//     console.log('User is outside San Francisco');
//     return -1; //User is outside San Francisco
//   }
//   console.log(userLat,userLong);
//   var verticalZones = Math.ceil(verticalLength / zoneVertical)-1; //13 vertical zones, zero indexed (0 to 12)
//   var horizontalZones = Math.ceil(horizontalLength / zoneHorizontal)-1; //22 horizontal zones, zero indexed (0 to 21)
//   var verticalStep = Math.abs(southLimit - northLimit) / verticalZones;
//   var horizontalStep = Math.abs(westLimit - eastLimit) / horizontalZones;
//   //Zones are numbered from top-left to bottom-right
//   var userX = Math.floor(Math.abs((userLong - eastLimit) / horizontalStep));
//   var userY = Math.floor(Math.abs((userLat - northLimit) / verticalStep));
//   console.log("usx ", userX);
//   console.log("usy ",userY);

//   var zoneNumber = userY * 1000 + userX; //Convert to YYYXXX, where YYY - vertical zone, XXX - horizontal zone
//   console.log(zoneNumber);
//   return zoneNumber;
// };

module.exports = DisplayLatLng;

//               <RestaurantMarker>
//              </RestaurantMarker>

/*
            <RestaurantMarkerView coordinate={establishment.coordinate}/> 

{this.state.establishments.map((establishment) => (
          
           <MapView.Marker coordinate={establishment.coordinate}>
            <RestaurantMarkerView 
              ref="m1"
              coordinate={establishment.coordinate}
              calloutOffset={{ x: -8, y: 28 }}
              calloutAnchor={{ x: 0.5, y: 0.4 }}
            >
            <MapView.Callout>
                <Text style={{ color: 'black' }}>Score:{establishment.ourRating.toPrecision(2)}</Text>
              </MapView.Callout>
            </RestaurantMarkerView>

          </MapView.Marker>
      
        ))}

*/

/*

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.jumpRandom} style={[styles.bubble, styles.button]}>
            <Text>Jump</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.animateRandom} style={[styles.bubble, styles.button]}>
            <Text>Animate</Text>
          </TouchableOpacity>
        </View>
    */
