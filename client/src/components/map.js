import React, { Component } from 'react-native';
import Menu from './menu';  

var Dimensions = require('Dimensions');   
var windowSize = Dimensions.get('window');    
const SideMenu = require('./sideMenu');   

var {
  AppRegistry,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Animated,
  Image
} = React;

var _ = require('underscore');

var MapView = require('react-native-maps');
var RestaurantMarkerView = require('./restaurantMarker.js');
var OutlineMarkerView = require('./outlineMarker.js');
var UserVotedView = require('./userVoted.js');
var DetailModal = require('./detailModal.js')
var InfoCallout = require('./infoCallout');
var styles = require('../assets/styles.js'); // mapStyles
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
// const LATITUDE = 37.7832096;
// const LONGITUDE = -122.4091516;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// a unique var for mapping user votes in callout
let uniqueId = 0;
let timeout = null; //Needed for userMove debounce

class Button extends Component {    
  handlePress(e) {    
    if (this.props.onPress) {   
      this.props.onPress(e);    
    }   
  }   
  render() {    
    return (    
      <TouchableOpacity   
        onPress={this.handlePress.bind(this)}   
        style={this.props.style}>   
        <Text>{this.props.children}</Text>    
      </TouchableOpacity>   
    );    
  }   
}

var App = React.createClass({
    render: function() {
      return (
        <View style={modalstyles.flexCenter}>
          <TouchableOpacity onPress={this.props.displayDetails}>
            <Text>Open Modal</Text>  
          </TouchableOpacity>
        </View>
      )
    }
});

var RouteStack = {
  app: {
    component: App 
  }
}


//THE ACTUAL map deal
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: this.props.user.latitude, 
        longitude: this.props.user.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      establishments: [],
      isOpen: false,
      selectedEstab: -1,
      showDetails: false,
      modal:true
    }
  }
  
  toggle() {    
    this.setState({   
      isOpen: !this.state.isOpen,   
    });   
  }

  updateMenuState(isOpen) {   
    this.setState({ isOpen, });   
  }

  show() {
    this.refs.m1.showCallout();
  }

  hide() {
    this.refs.m1.hideCallout();
  }

 onRegionChange(region) {
   //this.setState({ region });     
   //navigator.geolocation.getCurrentPosition(position => gotLocation.call(this,position), logError);
  function getEstabs(){
    console.log('Got into region change');
    this.setState({ region });
    var oldUserZone = this.props.user.userZone;
    var userId = this.props.user.id;
    var socket = this.props.socket;
    this.props.userMoves(userId, socket, oldUserZone, region.latitude, region.longitude);  
  }
     //Run getEstabs one second after moving stopped;
  clearTimeout(timeout)
  timeout = setTimeout(getEstabs.bind(this),1000);
}

changeTrait() {
  console.log("chh trait");
  // console.log("USE PROPS  --- ", this.props.user, "user");
}

addVotesLive() {
  this.setState({establishments: addVotes(this.state.establishments)});
  this.calculateUserScores();
}

// MOVE THIS OUT?
  calculateHistScores (estabId) {
    if (this.props.establishments[estabId] === undefined) {
      return 0;
    } else {
      var cume = 0;
      var total = 0;
      for (var x = 0; x < this.props.user.traitCombo.length; x++) {
        cume += ((this.props.establishments[estabId]['trait'+this.props.user.traitCombo[x]+'Pos'])/
          (this.props.establishments[estabId]['trait'+this.props.user.traitCombo[x]+'Tot']));
          total++;
      } 
    }
    return Math.round(cume/total*10);   
  }

  calculateLiveScores (estabId) {
    var pos = 0;
    var total = 0;
    if(this.props.user.traitCombo) {
      var traits = this.props.user.traitCombo;
      this.props.establishments[estabId].Votes.forEach(function(vote){
        if(traits.indexOf(vote.traitId) > -1) {
          total++;
          if (vote.voteValue === true) {
            pos++;
          }
        }
      });
      if(total === 0) {
        return 0;
      } else {
        return Math.round(pos/total*10);
      }
    } else {
      return 0;
    }
  }

  calculateUserVoted (estabId) {
    if(this.props.establishments[estabId].userVotes.length === 0) {
      return 2;
    } else {
      var pos = 0;
      var total = 0;
      this.props.establishments[estabId].userVotes.forEach(function(vote){
        total++;
        if(vote.voteValue === true) pos++;
      });
      return (Math.round(pos/total));
    }
  }

  displayDetails (id) {
    console.log("DISP ESTAB ->", this.props.establishments[id]);
    this.setState({selectedEstab:id});
    this.setState({showDetails: true});
  }
  hideDetails () {
    console.log("hide ESTAB ->");
    this.setState({selectedEstab:-1});
    this.setState({showDetails: false});
  }


  inView (coords) {
    return (LATITUDE - LATITUDE_DELTA > coords.latitude < LATITUDE + LATITUDE_DELTA 
      && LONGITUDE - LONGITUDE_DELTA > coords.longitude < LONGITUDE + LONGITUDE_DELTA 
      )
  }

  render() {
    const menu = <Menu user = {this.props.user.id} socket = {this.props.socket} reactNavigator = {this.props.navigator} logOut = {this.props.logOut.bind(this)} resetTraits = {this.props.resetTraits} toggle = {this.toggle.bind(this)}/>;
    return (
      <SideMenu   
      menu={menu}   
      isOpen={this.state.isOpen}    
      onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={{height: windowSize.height, backgroundColor: '#f7f6f3'}}>

      <View style={styles.mapStyles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.mapStyles.map}
          showsUserLocation={true}
          showsPointsOfInterest={false}
          initialRegion = {this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >        
        {_.map(this.props.establishments, (establishment) => (
          <MapView.Marker key={establishment.id} 
            coordinate={{latitude:establishment.latitude, longitude: establishment.longitude}}
            centerOffset={{x:0,y:0}}
            calloutOffset={{ x: 0, y: 0 }}
            calloutAnchor={{ x: 0, y: 0 }}
            onPress={this.displayDetails.bind(this, establishment.id)}
            ref="m1">
            <View style={styles.liveStyles[this.calculateLiveScores.call(this, establishment.id)]}>
              <View style={styles.histStyles[this.calculateHistScores.call(this, establishment.id)]}>
                <View style={styles.userDot[this.calculateUserVoted.call(this, establishment.id)]}/>
              </View>
            </View>
            <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{establishment.name}</Text>
            <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>LV:{this.calculateLiveScores.bind(this, establishment.id)()}/10 HS: {this.calculateHistScores.bind(this, establishment.id)()}/10</Text>
          </MapView.Marker>

        ))}
        </MapView>
        <View style={styles.mapStyles.buttonContainer}>
          <TouchableHighlight onPress={this.changeTrait.bind(this)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{traitNames[this.props.user.traitCombo[0]]}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.changeTrait.bind(this)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{traitNames[this.props.user.traitCombo[1]]}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.changeTrait.bind(this)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{traitNames[this.props.user.traitCombo[2]]}</Text>
          </TouchableHighlight>
        </View>

        <View >
          {this.state.showDetails && this.props.establishments[this.state.selectedEstab] ? <DetailModal estab={this.props.establishments[this.state.selectedEstab]} user={this.props.user} closeModal={() => this.hideDetails() }/> : null }
        </View>
        </View>
        <View style={{marginTop: 20}}></View>
          <Button style={styles.mapStyles.button} onPress={() => this.toggle()}>
            <Image source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: windowSize.height/20, height: windowSize.height/20, }} />   
          </Button>
        </View> 
        
      </SideMenu>
    );
  }

};

// var modalstyles.mapStyles = StyleSheet.create({
//   container: {
//     backgroundColor: 'blue',
//     flex: 1,
//   },
//   flexCenter: {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center'
//   },
//   modal: {
//     backgroundColor: 'rgba(0,200,0,.8)',
//     position: 'absolute',
//     top: 300,
//     right: 0,
//     bottom: 0,
//     left: 0
//   }
// });

        // <View style={[styles.mapStyles.bubble, styles.mapStyles.latlng]}>
        //   <Text style={{ textAlign: 'center'}}>
        //     {`${this.props.user.traitCombo}`}
        //   </Text>
        // </View>

