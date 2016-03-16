var React = require('react-native');
var {
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = React;


var MapView = require('react-native-maps');
var restaurants = require('./dummyEstablishments.js').dummyData;
// console.log(restaurants);
var styles = require('../assets/styles.js').mapStyles;

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
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
      me: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      you: {
        latitude: LATITUDE + .01,
        longitude: LONGITUDE + .02
      },
      establishments: restaurants
    };
  },

  onRegionChange(region) {
    this.setState({ region });
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
        <MapView.Marker coordinate={this.state.me}> 
          </MapView.Marker>
             <MapView.Marker coordinate={this.state.you}> 
          </MapView.Marker>
        <MapView.Marker coordinate={this.state.establishments[0].coordinate}> 
          </MapView.Marker>
             <MapView.Marker coordinate={this.state.establishments[1].coordinate}> 
          </MapView.Marker>
          <MapView.Marker coordinate={this.state.establishments[2].coordinate}> 
          </MapView.Marker>
        {this.state.establishments.forEach((establishment) =>
          <View>
          <MapView.Marker coordinate={establishment.coordinate}> 
          </MapView.Marker>
          </View>
        )}
        </MapView>
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.jumpRandom} style={[styles.bubble, styles.button]}>
            <Text>Jump</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.animateRandom} style={[styles.bubble, styles.button]}>
            <Text>Animate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

module.exports = DisplayLatLng;


var dummyRestaurants = [];
