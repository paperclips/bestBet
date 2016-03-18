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
              coordinate={establishment.coordinate}
              centerOffset={{x:0,y:0}}
              calloutOffset={{ x: 0, y: 0 }}
              calloutAnchor={{ x: 0, y: 0}}
              ref="m1"
              style={dotStyles[Math.floor(establishment.ourRating/10)]}
              />

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

module.exports = DisplayLatLng;


var dotStyles = [
  {},
  {},
  {},
  {
    backgroundColor: 'red',
    opacity:.3,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  {
    backgroundColor: 'red',
    opacity:.7,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  {
    backgroundColor: 'red',
    opacity:1,
    justifyContent: 'center',
    height:8,
    width:8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  {
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:12,
    width:12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  {
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:18,
    width:18,
    borderRadius: 9,
    alignSelf: 'flex-start'
  },
  {
    backgroundColor: 'green',
    opacity:.7,
    justifyContent: 'center',
    height:24,
    width:24,
    borderRadius: 12,
    alignSelf: 'flex-start'
  }
];
