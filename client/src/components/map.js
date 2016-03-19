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
var _ = require('underscore');

var MapView = require('react-native-maps');
var restaurants = require('./dummyEstablishments.js').dummyData;
var RestaurantMarkerView = require('./restaurantMarker.js');
var votes = require('./dummyVotes.js').dummyVotes;
var InfoCallout = require('./infoCallout');
var zoneCalculator = require('./zoneCalculator.js').zoneCalculator;
var styles = require('../assets/styles.js').mapStyles;

// SAMPLE DATA:
var user = {id: 123, name: 'bribri', token:'abfe45'};
var uPrefs = [2,5,4];
var uPrefsSecond = [1,7,2];

var traitNames = {
  1:'Good Food', 
  2:'Good Drinks', 
  3:'Good Deal', 
  4:'Not Noisy', 
  5:'Not Crowded', 
  6:'No Wait',
  7:'Good Service',
  8:'Upscale', 
  9:'Veggie Friendly'
};


var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.7832096;
const LONGITUDE = -122.4091516;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var calculateEstablishmentQuality = function () {
  votes.forEach(function(vote){
    restaurants[vote.establishmentId].traits[vote.traitId].votes++;
    if (vote.voteValue === true) {
      restaurants[vote.establishmentId].traits[vote.traitId].pos++;
    }
    if(vote.voteValue.userId === 123) {
      restaurants[vote.establishmentId].userVoted = true;
    }
  });
};

var addVotes = function (establishments) {
  _.each(establishments, function (establishment) {
    _.each(traitNames, function (trait, i) {
      establishment.traits[i].pos += Math.floor(Math.random()*5);
      establishment.traits[i].votes += Math.floor(5+ Math.random()*5);
    });
  });
  return establishments;

};

calculateEstablishmentQuality();
// console.log(restaurants);

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
      userId:user.id,
      uPrefs: uPrefs
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

  changeTrait() {
    this.setState({ uPrefs: [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)] });
  },

  addVotesLive() {
    this.setState({establishments: addVotes(this.state.establishments)});
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
          initialRegion={this.state.region}

          onRegionChange={this.onRegionChange}
        >
        {_.map(this.state.establishments, (establishment) => (

          <MapView.Marker key={establishment.id} coordinate={establishment.coordinate}
          centerOffset={{x:0,y:0}}
            calloutOffset={{ x: 0, y: 0 }}
            calloutAnchor={{ x: 0, y: 0 }}
            ref="m1"
            style={dotStyles[Math.floor(establishment.ourRating/10)]}>
            
            <RestaurantMarkerView 
              coordinate={establishment.coordinate}
              centerOffset={{x:0,y:0}}
              calloutOffset={{ x: 0, y: 0 }}
              calloutAnchor={{ x: 0, y: 0}}
              ref="m1"
              style={dotStyles[Math.floor(establishment.ourRating/10)]}/>

            <MapView.Callout tooltip>
              <InfoCallout>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {establishment.traits[this.state.uPrefs[0]].pos}/{establishment.traits[this.state.uPrefs[0]].votes}
                </Text>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {establishment.traits[this.state.uPrefs[1]].pos}/{establishment.traits[this.state.uPrefs[1]].votes}
                </Text>
                <Text style={{ fontWeight:'bold', color: 'white' }}>
                  {establishment.traits[this.state.uPrefs[2]].pos}/{establishment.traits[this.state.uPrefs[2]].votes}
                </Text>
              </InfoCallout>
            </MapView.Callout>
          <Text style={{ fontWeight:'bold', color: 'black' }}>{establishment.name}</Text>

        </MapView.Marker>

          ))}
        </MapView>
        <TouchableOpacity onPress={this.changeTrait} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Change</Text>
          </TouchableOpacity>
                  <TouchableOpacity onPress={this.addVotesLive} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 8, fontWeight: 'bold' }}>addVotes</Text>
          </TouchableOpacity>

        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center'}}>

            {`${this.state.uPrefs},${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}, ${this.state.zone}`}
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
