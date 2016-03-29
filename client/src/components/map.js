import React, { Component } from 'react-native';
import Menu from './menu';  

var Dimensions = require('Dimensions');   
var windowSize = Dimensions.get('window');    
const SideMenu = require('./sideMenu');   

var {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Image
} = React;

var _ = require('underscore');

var MapView = require('react-native-maps');
var OutlineMarkerView = require('./outlineMarker.js');
var DetailModal = require('./detailModal.js')
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

//Returns object {estId:{liveScore:(0-10), histScore:(0-10), userScore:(0,1,2), liveVotes: (total live votes)}
let calcAllScores = function(estabObj,userTraits){
  let results = {};
  _.each(estabObj, (estab) => {
    let allVotes = estab.Votes.filter((vote) => userTraits.indexOf(vote.traitId)>-1)
    let posLive = allVotes.reduce((pos,vote) => pos+vote.voteValue,0);
    let totLive = allVotes.length;
    let allUserVotes = estab.userVotes.filter((vote) => userTraits.indexOf(vote.traitId)>-1)
    let posUser = allUserVotes.reduce((pos,vote) => pos+vote.voteValue,0);
    let totUser = allUserVotes.length;
    let posHist = 0;
    let totHist = 0;
    _.each(userTraits, (traitId) => {
      posHist += estab['trait'+traitId+'Pos'];
      totHist += estab['trait'+traitId+'Tot'];
    });
    let liveScore = totLive === 0 ? 0 : Math.round(posLive/totLive*10);
    let histScore = totHist === 0 ? 0 : Math.round(posHist/totHist*10);
    let userScore = totUser === 0 ? 2 : Math.round(posUser/totUser);
    let liveVotes = estab.Votes.length;
    results[estab.id] = {liveScore, histScore, userScore, liveVotes}
  })
  return results;
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
    this.setState({ isOpen });   
  }

  onRegionChange(region) {
    //navigator.geolocation.getCurrentPosition(position => gotLocation.call(this,position), logError);
    function getEstabs(){
      console.log('Got into region change');
      var scores = calcAllScores(this.props.establishments,this.props.user.traitCombo);
      this.props.saveScores(scores);
      this.setState({ region });
      var oldUserZone = this.props.user.userZone;
      var userId = this.props.user.id;
      var socket = this.props.socket;
      this.props.userMoves(userId, socket, oldUserZone, region.latitude, region.longitude);
    }
    //Run getEstabs one second after moving stopped;
    clearTimeout(timeout);
    timeout = setTimeout(getEstabs.bind(this),1000);
  }

  changeTrait() {
    console.log(this.props.user.traitCombo);
    var newTraits = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)]
    this.props.resetTraits(null,null,newTraits);
    console.log(this.props.user.traitCombo);
  }

  displayDetails (id) {
    this.setState({showDetails: true, selectedEstab:id});
  }

  hideDetails () {
    this.setState({showDetails: false, selectedEstab:-1});
  }

  renderMarkers(){
    console.log('RERENDER');
    return _.map(this.props.establishments, (est) => (
      <MapView.Marker 
        key={est.id}
        coordinate={{latitude:est.latitude, longitude: est.longitude}}
        onPress={this.displayDetails.bind(this, est.id)}
      >
        <View style={styles.histStyles[this.props.scores[est.id].histScore]}>
          <View style={styles.liveStyles[this.props.scores[est.id].liveScore]}>
            <View style={styles.userDot[this.props.scores[est.id].userScore]}/>
          </View>
        </View>
        <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{est.name}</Text>
        <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>LV:{this.props.scores[est.id].liveScore}/10, HS: {this.props.scores[est.id].histScore}/10</Text>
      </MapView.Marker>
    ))
  }

  renderModal(){
    console.log('RERENDER MODAL');
    return <DetailModal 
              userTraits={this.props.user.traitCombo} 
              estab = {this.props.establishments[this.state.selectedEstab]}
              closeModal={() => this.hideDetails() }
              {...this.props}
            />
  }

  render() {
    const menu = <Menu user = {this.props.user.id} socket = {this.props.socket} reactNavigator = {this.props.navigator} logOut = {this.props.logOut.bind(this)} resetTraits = {this.props.resetTraits} toggle = {this.toggle.bind(this)}/>;
    return (
      <SideMenu   
        menu={menu}   
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
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

          {Object.keys(this.props.establishments).length !== 0 && Object.keys(this.props.scores).length !== 0 && this.renderMarkers.call(this)}

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