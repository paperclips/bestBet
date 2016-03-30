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
var styles = require('../assets/styles.js');

var traitNames = {
  1:'Food', 
  2:'Drinks', 
  3:'Value', 
  4:'Not Noisy', 
  5:'Not Crowded', 
  6:'No Wait',
  7:'Service',
  8:'Upscale', 
  9:'Veggie'
};

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// a unique var for mapping user votes in callout
let uniqueId = 0;
let timeout = null; //Needed for userMove debounce

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
      modal:true,
      userTraits: []
    }
  }
  
  toggle() {    
    this.setState({   
      isOpen: !this.state.isOpen,   
    });   
  }

  updateMenuState(isOpen) {   
    this.setState({ isOpen });   
  }

  onRegionChange(region) {
    //navigator.geolocation.getCurrentPosition(position => gotLocation.call(this,position), logError);
    function getEstabs(){
      console.log('Got into region change');
      this.setState({ region });
      var oldUserZone = this.props.user.userZone;
      var userId = this.props.user.id;
      var socket = this.props.socket;
      this.props.userMoves(userId, socket, oldUserZone, region.latitude, region.longitude);
      if(!this.state.userTraits.length) {
        this.setState({userTraits: this.props.user.traitCombo})  
      }
    }
    //Run getEstabs one second after moving stopped;
    clearTimeout(timeout);
    timeout = setTimeout(getEstabs.bind(this),1000);
  }

changeTrait() {
  console.log("BEF ",this.state.userTraits);
  var newTraits = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)]
  this.setState({userTraits:newTraits});
  console.log("AFT ",this.state.userTraits);
  var self = this;
  // console.log("USE PROPS  --- ", this.props.user, "user");
}

  calculateHistScores (estabId) {
    var cume = 0, total = 0;
    this.props.establishments[estabId] && this.state.userTraits.forEach((traitId) => {
      cume += ((this.props.establishments[estabId]['trait'+traitId+'Pos'])/
              (this.props.establishments[estabId]['trait'+traitId+'Tot']));
      total++;
    })
    return total === 0 ? 0 : Math.round(cume/total*10);
  }

  calculateLiveScores (estabId) {
    var pos = 0, total = 0;
    if(this.props.user.traitCombo) {
      var traits = this.state.userTraits;
      this.props.establishments[estabId].Votes.forEach((vote) => {
        if(traits.indexOf(vote.traitId) > -1) {
          total++;
          vote.voteValue && pos++;
        }
      })
    }
    console.log('TOTAL:',this.props.user.traitCombo);
    return total === 0 ? 0 : Math.round(pos/total*10);
  }

  calculateUserVoted (estabId) {
    var pos = 0, total = 0;
    this.props.establishments[estabId].userVotes.forEach((vote) => {
      total++;
      vote.voteValue && pos++;
    });
    return total === 0 ? 2 : Math.round(pos/total);
  }

  displayDetails (id) {
    this.setState({selectedEstab:id});
    this.setState({showDetails: true});
  }

  hideDetails () {
    console.log("hide ESTAB ->");
    this.setState({selectedEstab:-1});
    this.setState({showDetails: false});
  }

  renderMarkers(){
    console.log('RERENDER');
    return _.map(this.props.establishments, (establishment) => (
      <MapView.Marker key={establishment.id} 
        coordinate={{latitude:establishment.latitude, longitude: establishment.longitude}}
        onPress={this.displayDetails.bind(this, establishment.id)}
      >
        <View style={styles.histStyles[this.calculateHistScores.call(this, establishment.id)]}>
          <View style={styles.liveStyles[this.calculateLiveScores.call(this, establishment.id)]}>
            <View style={styles.userDot[this.calculateUserVoted.call(this, establishment.id)]}/>
          </View>
        </View>
        <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{establishment.name}</Text>
        <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>LV:{this.calculateLiveScores.call(this, establishment.id)}/10 HS: {this.calculateHistScores.call(this, establishment.id)}/10</Text>
      </MapView.Marker>
    ))
  }

  renderModal(){
    console.log('RERENDER MODAL');
    return <DetailModal 
              estab={this.props.establishments[this.state.selectedEstab]}
              userTraits={this.state.userTraits} 
              live={this.calculateLiveScores.call(this, this.state.selectedEstab)} 
              hist={this.calculateHistScores.call(this, this.state.selectedEstab)}
              closeModal={() => this.hideDetails() }
            />
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

          {this.renderMarkers.call(this)}

          </MapView>

          <View style={styles.mapStyles.buttonContainer}>
            {_.map(this.state.userTraits, (trait) => (
              <TouchableHighlight key = {trait} onPress={this.changeTrait.bind(this)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{traitNames[trait]}</Text>
              </TouchableHighlight>
            ))}
          </View>

          <View >
            {this.state.showDetails && this.props.establishments[this.state.selectedEstab] && this.renderModal.call(this)}
          </View>
        </View>
        <TouchableOpacity style={styles.mapStyles.sandwichButton} onPress={() => this.toggle()}>
          <Image source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: windowSize.height/20, height: windowSize.height/20 }} />   
        </TouchableOpacity>
      </View> 
      </SideMenu>
    );
  }
};