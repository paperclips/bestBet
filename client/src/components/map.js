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
const LATITUDE_DELTA = 0.006834106338743595;
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
      isOpen: false,
      selectedEstab: -1,
      showDetails: false,
      modal:true,
      showNames: true,
      smallDots: false
    }
  }
  curInView = 0;

  toggle() {    
    this.setState({   
      isOpen: !this.state.isOpen,   
    });   
  }

  updateMenuState(isOpen) {   
    this.setState({ isOpen });   
  }

  onRegionChange(region) {
    this.curInView = 0;
    region.longitudeDelta > .006 && this.setState({showNames: false, smallDots: true});
    region.longitudeDelta < .006 && this.setState({showNames: true, smallDots: false});

    // console.log("DELTA long--->",region.longitudeDelta);

    //navigator.geolocation.getCurrentPosition(position => gotLocation.call(this,position), logError);
    function getEstabs(){
      this.setState({ region });
      var oldUserZone = this.props.user.userZone;
      var userId = this.props.user.id;
      var socket = this.props.socket;
      this.props.userMoves(userId, socket, oldUserZone, region.latitude, region.longitude);
    }
    //Run getEstabs one second after moving stopped;
    clearTimeout(timeout);
    timeout = setTimeout(getEstabs.bind(this),500);
  }

  changeTrait() {
    console.log(this.state.region);
    // console.log(this.props.user.traitCombo);
    // var newTraits = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)]
    // this.props.resetTraits(null,null,newTraits);
    // console.log(this.props.user.traitCombo);
  }

  displayDetails (id) {
    this.setState({showDetails: true, selectedEstab:id});
  }

  hideDetails () {
    this.setState({showDetails: false, selectedEstab:-1});
  }

  inView (latitude,longitude) {
    var westLimit = this.state.region.longitude - this.state.region.longitudeDelta/2;
    var eastLimit = this.state.region.longitude + this.state.region.longitudeDelta/2;
    var southLimit = this.state.region.latitude - this.state.region.latitudeDelta/2;
    var northLimit = this.state.region.latitude + this.state.region.latitudeDelta/2;

    return longitude > westLimit && longitude < eastLimit && latitude > southLimit && latitude < northLimit
  }

  renderMarkers(){
    this.curInView = 0;
    return _.map(this.props.allData.establishments, (est) => {
      if(this.inView(est.latitude,est.longitude)){
        this.curInView++;
        return (
          <MapView.Marker
            key={est.id}
            coordinate={{latitude:est.latitude, longitude: est.longitude}}
            onPress={this.displayDetails.bind(this, est.id)}
          >
            {this.state.smallDots ? (this.props.allData.userComboScore[est.id].liveScore ? <View style={styles.zoomedOut[this.props.allData.userComboScore[est.id].liveScore]}/> : (this.props.allData.userComboScore[est.id].userScore!==2 ? <View style={styles.userDot[this.props.allData.userComboScore[est.id].userScore]}/> : <View style={styles.zoomedOut[this.props.allData.userComboScore[est.id].histScore]}/>)) : 
              <View style={styles.histStyles[this.props.allData.userComboScore[est.id].histScore]}>
                <View style={styles.liveStyles[this.props.allData.userComboScore[est.id].liveScore]}>
                  <View style={styles.userDot[this.props.allData.userComboScore[est.id].userScore]}/>
                </View>
              </View>
             }
            {(this.state.showNames || this.state.selectedEstab === est.id || this.curInView < 15) && <View>
              <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>{est.id}: {est.name}</Text>
            </View>}
          </MapView.Marker>
        )
      }
    })
  }

  renderModal(){
    return <DetailModal 
              userTraits={this.props.user.traitCombo} 
              estab = {this.props.allData.establishments[this.state.selectedEstab]}
              closeModal={() => this.hideDetails() }
              {...this.props}
            />
  }

  render() {
    const menu = <Menu user = {this.props.user.id} socket = {this.props.socket} reactNavigator = {this.props.navigator} logOut = {this.props.logOut.bind(this)} resetTraits = {this.props.resetTraits.bind(this)} toggle = {this.toggle.bind(this)}/>;
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

          {this.props.allData.establishments && this.renderMarkers.call(this)}

          </MapView>

          <View style={styles.mapStyles.buttonContainer}>
            {_.map(this.props.user.traitCombo, (trait) => (
              <TouchableHighlight key = {trait} onPress={this.changeTrait.bind(this)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{traitNames[trait]}</Text>
              </TouchableHighlight>
            ))}
          </View>

          <View >
            {this.state.showDetails && this.props.allData.establishments[this.state.selectedEstab] && this.renderModal.call(this)}
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

