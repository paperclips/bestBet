'use strict';
var React = require('react-native');
// import Drawer from 'react-native-drawer';
// var drawer = require('react-native-drawer');
var { 
  AppRegistry,
  Component, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} = React;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

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

var styles = require('../assets/styles.js'); // mapStyles

var { width, height } = Dimensions.get('window');

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

var DetailModal = React.createClass({
  getInitialState: function() {
    return { 
      offset: new Animated.Value(deviceHeight* 0.5),
    }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  renderLiveScore: function (trait) {
    var score = {pos:0, tot:0};
    this.props.estab.Votes.forEach(function(vote){
      console.log(vote);
      if(trait === vote.traitId) {
        score.tot++;
        if (vote.voteValue === true) {
          score.pos++;
        }
      }      
    });
    console.log(trait,score);
    return score;
  }, 
  render: function() {
    return (
      <View style={modalStyles.modal} onPress={this.closeModal}>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name}   <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text></Text>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[0]]}: NOW: {this.renderLiveScore(this.props.userTraits[0]).pos} / {this.renderLiveScore(this.props.userTraits[0]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[0] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[0] +'Tot']} </Text>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[1]]}: NOW: {this.renderLiveScore(this.props.userTraits[1]).pos} / {this.renderLiveScore(this.props.userTraits[1]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[1] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[1] +'Tot']} </Text>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[2]]}: NOW: {this.renderLiveScore(this.props.userTraits[2]).pos} / {this.renderLiveScore(this.props.userTraits[2]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[2] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[2] +'Tot']} </Text>
      </View>
    )
  }
});

var modalStyles = StyleSheet.create({
  boo: {
  backgroundColor: 'blue',
  borderColor: 'red',
  borderWidth: 50,
},
  modal: {
    padding: 5,
    width:width, 
    height:height/8, 
    backgroundColor:'white',
    borderColor: 'rgba(34, 224, 0, 0.3)',
    borderWidth:5,

  }
});

module.exports = DetailModal;



/*

  

 <Animated.View style={[modalstyles.modal, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: 'black'}}>mymodal!</Text>
          </TouchableOpacity>
        </Animated.View>


        <svg width="100" height="100">
          <circle style={modalStyles.boo}r="25" cx="50" cy="50" />
        </svg>
*/