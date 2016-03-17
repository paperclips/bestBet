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

var zoneCalc = require('./zoneCalculator.js').zoneCalc;
var MapView = require('react-native-maps');
var restaurants = require('./dummyEstablishments.js').dummyData;
var RestaurantMarkerView = require('./restaurantMarker.js');
var InfoCallout = require('./infoCallout');
let id = 0;


var styles = require('../assets/styles.js').mapStyles;

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.7832096;
const LONGITUDE = -122.4091516;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ZONE = zoneCalc(LATITUDE,LONGITUDE);


var DisplayLatLng = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        zone: zoneCalc(37.7832096,-122.4091516)
      },
      events:[],
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
    this.setState({ region: this.calcZone() });
  },
  calcZone(reg) {
    var {region} = this.state;
    return {
      ...this.state.region,
      zone: zoneCalc(this.state.latitude, this.state.longitude)
    }
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
              calloutOffset={{ x: 15, y: 0 }}
              calloutAnchor={{ x: 0, y: 0}}
            >
            </RestaurantMarkerView>
            <MapView.Callout tooltip>
              <InfoCallout>
                <Text style={{ color: 'black' }}>Score:{establishment.ourRating.toPrecision(2)}</Text>
              </InfoCallout>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}, ${this.state.region.zone}`}
          </Text>
        </View>
      </View>
    );
  },
});


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
