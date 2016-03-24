import React, { Component } from 'react-native';


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
var UserMarkerView = require('./userMarker.js');
var OutlineMarkerView = require('./outlineMarker.js');
var UserVotedView = require('./userVoted.js');

var votes = require('./dummyVotes.js').dummyVotes;
var InfoCallout = require('./infoCallout');
var zoneCalculator = require('../actions/zoneHandler.js').zoneCalculator;
var styles = require('../assets/styles.js').mapStyles;

// SAMPLE DATA:
var user = {id: 123, name: 'bribri', token:'abfe45'};
var uPrefs = [2,5,4];

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

// // Functions that will be moved:
// var processVoteData = function () {
//   votes.forEach(function(vote){
//     restaurants[vote.establishmentId].traits[vote.traitId].votes++;
//     if (vote.voteValue === true) {
//       restaurants[vote.establishmentId].traits[vote.traitId].pos++;
//     }
//     if(vote.voteValue.userId === 123) {
//       if(vote.voteValue === true) {
//         restaurants[vote.establishmentId].userVoted = 2;
//       } else {
//         restaurants[vote.establishmentId].userVoted = 1;
//       }
//     }
//   });
// };

// var addVotes = function (establishments) {
//   _.each(establishments, function (establishment) {
//     _.each(traitNames, function (trait, i) {
//       establishment.traits[i].pos += Math.floor(Math.random()*2);
//       establishment.traits[i].votes += 1;
//     });
//   });
//   return establishments;
// };

// processVoteData();


//THE ACTUAL map deal
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      myLocation: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      zone: zoneCalculator(37.7832096, -122.4091516),
      establishments: [],
      userId:user.id,
      uPrefs: [],
      intervalId: -1
    }
  }
  
  show() {
        this.refs.m1.showCallout();
      }

  hide() {
    this.refs.m1.hideCallout();
  }

  onRegionChange(region) {
    console.log("INIT ESTS ===>",this.props.establishments,"INIT ENNND");
     // console.log("INIT USER ===>",this.props.user,"INIT ENNND");
    var uP = this.props.user.traitCombo.toString().split("");
    console.log(uP);
    this.setState({ region });
    this.setState({ zone: this.calcZone()});
    this.setState({ establishments: this.props.establishments});
    this.setState({ uPrefs: uP });
    this.setState({ userId: this.props.user.id });

    var userId = this.props.user.id;
    console.log("AFT INIT STATE ",this.state, "STATE AFF INIT");
    var socket = this.props.socket;
    var oldUserZone = this.props.user.userZone;
    //Update userZone in store, get new Establishments, join/leave zones
    var liveLOC ={};
    function gotLocation(position){
      console.log(position);
      liveLOC = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
    };
    function logError(error) {
      console.log('Navigator \'getCurrentPosition\' error:', error);
    };
    navigator.geolocation.getCurrentPosition(position => gotLocation(position), logError);
    this.setState({region: liveLOC});
    console.log("NEW RGE --- > ",this.state.region);

    this.props.userMoves(userId, socket, oldUserZone, this.state.region.latitude, this.state.region.longitude);
  
  }

  calcZone() {
    var curRegion = this.state.region;
    return zoneCalculator(curRegion.latitude, curRegion.longitude);
  }

  changeTrait() {
    console.log("ESTABS REAL--->",this.props.establishments, "EST ENNND");
    var uP = this.props.user.traitCombo.toString().split("");
    this.setState({ uPrefs: uP });
    this.setState({ establishments: this.props.establishments});
    console.log (this.state.establishments, "IS IT IN?")
  }

  addVotesLive() {
    this.setState({establishments: addVotes(this.state.establishments)});
    this.calculateUserScores();
  }

  turnOnVoteFlux () {
    // this.setState({intervalId:window.setInterval(addVotesLive, 500)});
  }

  turnOffVoteFlux () {
    // clearInterval(this.state.intervalId);
  }

  calculateUserScores (estabId) {
    // if (this.state.establishments[estabId] === undefined) {
    //   return 0;
    // } else {
    //   var cume = 0.0;
    //   var totes = 0;
    //    for (var x = 0; x < 3; x++) {
    //     if (this.state.establishments[estabId].traits[this.state.uPrefs[x]].votes>0) {
    //       cume += 
    //       this.state.establishments[estabId].traits[this.state.uPrefs[x]].pos/
    //         this.state.establishments[estabId].traits[this.state.uPrefs[x]].votes
    //       totes++;
    //     } 
    //    }
    // }
    // if(totes === 0) {
    //   return 0;
    // }
    return 7;
    // return Math.ceil(10*(cume/totes));   
  }

  inView (coords) {
    return (LATITUDE - LATITUDE_DELTA > coords.latitude < LATITUDE + LATITUDE_DELTA 
      && LONGITUDE - LONGITUDE_DELTA > coords.longitude < LONGITUDE + LONGITUDE_DELTA 
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        <MapView.Marker coordinate={this.state.myLocation}>
          <UserMarkerView/>
        </MapView.Marker>
        <MapView.Marker coordinate={this.state.myLocation}>
          <OutlineMarkerView/>
        </MapView.Marker>
        {_.map(this.props.establishments, (establishment) => (
          <MapView.Marker key={establishment.id} 
            coordinate={establishment.coordinate}
            centerOffset={{x:0,y:0}}
            calloutOffset={{ x: 0, y: 0 }}
            calloutAnchor={{ x: 0, y: 0 }}
            ref="m1">
              <View style={scoreStyles[this.calculateUserScores.bind(this, establishment.id)()]}>
                <View style={userDot[establishment.userVoted]}/>
              </View>

              <MapView.Callout tooltip>
                <InfoCallout>
                <Text style={{ fontWeight:'bold', fontSize: 12, color: 'white' }}>{establishment.id}:{establishment.name}</Text>

                </InfoCallout>
              </MapView.Callout>

              <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{establishment.name}:{this.calculateUserScores.bind(this, establishment.id)()}/10</Text>
          </MapView.Marker>

          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.changeTrait.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Trait</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addVotesLive.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>voteOnce</Text>
          </TouchableOpacity>
        </View>
          <View style={[styles.bubble, styles.latlng]}>
            <Text style={{ textAlign: 'center'}}>
              {`${this.state.uPrefs},${this.state.region.latitude}, ${this.state.region.longitude}, ${this.state.zone}`}
            </Text>
          </View>
        </View>
    );
  }

};


var userDot = {
  1: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'red',
    borderColor: 'blue',
    borderWidth:1
  },
  0: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'black',
    borderColor: 'white',
    borderWidth:2,
  },
  1: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'lime',
    borderColor: 'blue',
    borderWidth:1,
  }
};

var scoreStyles = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor:'rgba(0, 0, 0, 0.3)'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:6,
    borderColor: 'rgba(255, 0, 0, 0.5)',

  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(255, 0, 0, 0.5)',
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:60,
    width:60,
    backgroundColor:'transparent',
    borderColor: 'rgba(230, 134, 0, 0.25)',
    borderWidth:24,
    borderRadius: 30,
  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(245, 241, 0, 0.2)',
    
  },
  6:{
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(163, 245, 0, 0.3)',
  },
  7:{
   justifyContent: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    alignSelf:'center',
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(34, 224, 0, 0.6)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:60,
    width:60,
    borderRadius: 30,
    borderWidth:24,
    borderColor: 'rgba(34, 224, 0, 0.7)',
  },
  
};

/*
<TouchableOpacity onPress={this.turnOnVoteFlux.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>fluxVotes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.turnOffVoteFlux.bind(this)} style={[styles.bubble, styles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>stop</Text>
          </TouchableOpacity>




                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                    HHH// {this.props.uPrefs[0]}:{establishment.traits[this.props.uPrefs[0]].pos}/{establishment.traits[this.state.uPrefs[0]].votes}
                  </Text>
                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                    HHH// {this.state.uPrefs[1]}:{establishment.traits[this.state.uPrefs[1]].pos}/{establishment.traits[this.state.uPrefs[1]].votes}
                  </Text>
                  <Text style={{ fontWeight:'bold', color: 'white' }}>
                   HHH // {this.state.uPrefs[2]}:{establishment.traits[this.state.uPrefs[2]].pos}/{establishment.traits[this.state.uPrefs[2]].votes}
                  </Text>



*/
  
