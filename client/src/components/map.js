import React, { Component } from 'react-native';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
        longitudeDelta: LONGITUDE_DELTA
    },
      selectedEstab: -1,
      showDetails: false,
      changingTraits: false,
      smallDots: false,
      oldTrait: -1,
      logoutConfirm: false
    }
  }
  curInView = 0;
  nameTags ={};
  onRegionChange(region) {
    this.props.socket.removeListener('voteAdded');
    this.curInView = 0;
    region.longitudeDelta > .006 && this.setState({smallDots: true});
    region.longitudeDelta < .006 && this.setState({smallDots: false});
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
  toggleChangingTraits (old) {
    this.setState({changingTraits: !this.state.changingTraits, oldTrait:Number(old)});
  }
  renderOtherTraits() {
    return(
    _.map(traitNames, (trait, key) => (
      (this.props.user.traitCombo.indexOf(Number(key)) < 0) &&
        <TouchableHighlight key = {trait} onPress={this.sendNewTrait.bind(this, this.state.oldTrait, key)} style={styles.mapStyles.otherButton}>
          <Text style={{ fontSize: 10, fontWeight: 'bold'}}>{trait}</Text>
        </TouchableHighlight>
        )
      )
    )
  }
  sendNewTrait (oldTrait, newTrait) {
    var traits = this.props.user.traitCombo;
    if (newTrait === -1) {
      traits.splice(this.props.user.traitCombo.indexOf(oldTrait),1);
    } else if(oldTrait === -1) {
      traits.push(Number(newTrait));
    } else {
      traits.forEach(function (trait, key) {
        console.log(trait, key);
        if(trait === oldTrait) {
          traits[key] = Number(newTrait);
        }
      });
    }
    this.props.resetTraits(this.props.user.id, this.props.socket, traits);
    this.setState({changingTraits:false});
    console.log(this.props.user.traitCombo);
  }
  resetToUser() {
    this.refs.map.animateToCoordinate({
      latitude: this.props.user.latitude,
      longitude: this.props.user.longitude},
      200
    );
  }
  toggleDetails (id) {
    (this.state.showDetails && id === this.state.selectedEstab) ? this.setState({showDetails: false, selectedEstab:-1}) : this.setState({showDetails: true, selectedEstab:id});
  }
  onMapPress (e) {
    if (e.nativeEvent.coordinate && this.state.showDetails) {
      this.setState({showDetails: false, selectedEstab:-1});
    }
  }

  inView (latitude,longitude) {
    var westLimit = this.state.region.longitude - this.state.region.longitudeDelta/2;
    var eastLimit = this.state.region.longitude + this.state.region.longitudeDelta/2;
    var southLimit = this.state.region.latitude - this.state.region.latitudeDelta/2;
    var northLimit = this.state.region.latitude + this.state.region.latitudeDelta/2;

    return longitude > westLimit && longitude < eastLimit && latitude > southLimit && latitude < northLimit
  }
  toggleLogoutConfirm() {
    this.setState({logoutConfirm: !this.state.logoutConfirm});
  }
  logOut() {
    this.props.logOut(this.props.navigator);
  }

  renderMarkers(){
    this.curInView = 0;
    this.nameTags = {};
    return _.map(this.props.allData.establishments, (est) => {
      if(this.inView(est.latitude,est.longitude)){
        // if the score is above a certain threshold, and we're below a number
        if ((this.props.allData.userComboScore[est.id].liveScore > 6 || this.props.allData.userComboScore[est.id].histScore > 7 || this.props.allData.userComboScore[est.id].userScore === 1) && this.curInView < 7) {
          this.nameTags[est.id]=1;
          this.curInView++;
        }
        return (
          <MapView.Marker
            key={est.id}
            coordinate={{latitude:est.latitude, longitude: est.longitude}}
            onPress={this.toggleDetails.bind(this, est.id)}
          >
            {(this.state.smallDots || (this.props.allData.userComboScore[est.id].histScore<=4 && this.props.allData.userComboScore[est.id].liveScore<=4 && this.props.allData.userComboScore[est.id].userScore!==1))? (this.props.allData.userComboScore[est.id].liveScore ? <View style={styles.zoomedOut[this.props.allData.userComboScore[est.id].liveScore]}/> : (this.props.allData.userComboScore[est.id].userScore!==2 ? <View style={styles.userDot[this.props.allData.userComboScore[est.id].userScore]}/> : <View style={styles.zoomedOut[this.props.allData.userComboScore[est.id].histScore]}/>)) :
              <View style={styles.histStyles[this.props.allData.userComboScore[est.id].histScore]}>
                <View style={styles.liveStyles[this.props.allData.userComboScore[est.id].liveScore]}>
                  <View style={styles.userDot[this.props.allData.userComboScore[est.id].userScore]}/>
                </View>
              </View>
             }
            {(this.state.selectedEstab === est.id || this.nameTags.hasOwnProperty(est.id)) && <View>
              <Text style={{fontSize: 11, fontWeight: 'bold',color: 'black', position: 'absolute'}}>{est.name}</Text>
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
              {...this.props}/>
  }

  render() {
    return (
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
            onPress={(e) => this.onMapPress(e)}>

          {this.props.allData.establishments && this.renderMarkers.call(this)}

          </MapView>
          <View style={styles.mapStyles.otherTraitContainer}>
          {this.state.changingTraits && this.renderOtherTraits.call(this)}
          {this.state.changingTraits && this.props.user.traitCombo.length>1 && <TouchableHighlight key={-1} onPress={this.sendNewTrait.bind(this, this.state.oldTrait, -1)} style={styles.mapStyles.otherButton}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>-</Text>
        </TouchableHighlight>}
          </View>

          <View style={styles.mapStyles.buttonContainer}>
            {this.props.user.traitCombo.length<3 && <TouchableHighlight key = {-1} onPress={this.toggleChangingTraits.bind(this, -1)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>+</Text>
            </TouchableHighlight>}
            {_.map(this.props.user.traitCombo, (trait) => (
              <TouchableHighlight key={trait} onPress={this.toggleChangingTraits.bind(this, trait)} style={[styles.mapStyles.bubble, styles.mapStyles.button]}>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{traitNames[trait]}</Text>
              </TouchableHighlight>
            ))}
            <TouchableOpacity style={styles.mapStyles.goToUser} onPress={() => this.resetToUser()}>
              <Image source={{ uri: 'http://i.stack.imgur.com/SX0qW.png', width: windowSize.height/18, height: windowSize.height/18}} />
            </TouchableOpacity>
          </View>
          <View >
            {this.state.showDetails && this.props.allData.establishments[this.state.selectedEstab] && this.renderModal.call(this)}
          </View>
        </View>

        {!this.state.showDetails && <TouchableOpacity style={styles.mapStyles.logoutButton} onPress={this.toggleLogoutConfirm.bind(this)}>
          <Image source={{ uri: 'http://image005.flaticon.com/1/png/128/56/56805.png', width: windowSize.height/35, height: windowSize.height/35, opacity: .3}} />
        </TouchableOpacity>}
        {this.state.logoutConfirm && (<View style={styles.mapStyles.menuContainer}>
          <TouchableOpacity style={[styles.mapStyles.bubble, styles.mapStyles.button]} onPress={() => this.logOut()}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.mapStyles.bubble, styles.mapStyles.button]} onPress={this.toggleLogoutConfirm.bind(this)}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
          </View>)
            }

        </View>
    );
  }
};
