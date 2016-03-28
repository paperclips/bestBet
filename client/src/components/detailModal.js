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

var _ = require('underscore');


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

var nums = [1,2,3,4,5,6,7,8,9];

var styles = require('../assets/styles.js'); // mapStyles

var { width, height } = Dimensions.get('window');

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');


var DetailModal =  React.createClass({
  getInitialState: function() {
    return { 
      offset: new Animated.Value(deviceHeight* 0.5),
      full: false
    }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  },
  toggleFull: function() {
    var old = this.state.full;
    this.setState({full:!old});
  },
  renderLiveScore: function (trait) {
    var score = {pos:0, tot:0};
    this.props.estab.Votes.forEach(function(vote){
      if(trait === vote.traitId) {
        score.tot++;
        if (vote.voteValue === true) {
          score.pos++;
        }
      }      
    });
    return score;
  }, 
  renderFull: function () {
    console.log(this.props.estab);
    return(
    <TouchableHighlight style={modalStyles.fullModal} onPress={this.toggleFull}>
      <View> 
        <Image
          style={modalStyles.fullImage}
          source={{uri: this.props.estab.imageUrl}}/>
        <View style={modalStyles.info}>  
          <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name}   <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text></Text>
          {_.map(this.props.userTraits,(trait) => (
            <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[trait]}: NOW: {this.renderLiveScore(trait).pos} / {this.renderLiveScore(trait).tot} USUAL:{this.props.estab['trait'+ trait +'Pos']} / {this.props.estab['trait'+ trait +'Tot']} </Text>
          ))}
          <Text> Other </Text>
          {_.map(nums,(num) => (
            <View key={num}>
            {this.props.userTraits.indexOf(num) >= 0 ? null : <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[num]}: NOW: {this.renderLiveScore(num).pos} / {this.renderLiveScore(num).tot} USUAL:{this.props.estab['trait'+ num +'Pos']} / {this.props.estab['trait'+ num +'Tot']} </Text>}
            </View>
          ))}
        </View>
      </View>
    </TouchableHighlight>
    )
  },
  renderBrief: function () {
    console.log("Rend brief?");
    return (
      <TouchableHighlight  onPress={this.toggleFull}>
        <View style={modalStyles.briefModal}>
          <Image
          style={modalStyles.restImage}
          source={{uri: this.props.estab.imageUrl}}/>  
          <View style={modalStyles.briefInfo}> 
            <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name}   <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text></Text>
            <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>{traitNames[this.props.userTraits[0]]}: NOW: {this.renderLiveScore(this.props.userTraits[0]).pos} / {this.renderLiveScore(this.props.userTraits[0]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[0] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[0] +'Tot']} </Text>
            <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>{traitNames[this.props.userTraits[1]]}: NOW: {this.renderLiveScore(this.props.userTraits[1]).pos} / {this.renderLiveScore(this.props.userTraits[1]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[1] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[1] +'Tot']} </Text>
            <Text style={{ fontWeight:'bold', fontSize: 10, color: 'black' }}>{traitNames[this.props.userTraits[2]]}: NOW: {this.renderLiveScore(this.props.userTraits[2]).pos} / {this.renderLiveScore(this.props.userTraits[2]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[2] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[2] +'Tot']} </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render: function() {
    console.log("render? ", this.state.full);
    return (
      <View>
        {this.state.full ? this.renderFull() : this.renderBrief()}
      </View>  
    )
  }
});

var modalStyles = StyleSheet.create({
  boo: {
    backgroundColor: 'blue',
    borderColor: 'red',
  },
  briefModal: {
    flexDirection:'row',
    width:width, 
    height:height/8 , 
    backgroundColor:'white',
  },
  briefInfo: {
    flex:3, 
    alignSelf: 'flex-end',
    padding: 5,
    height: height/8,
    width: width - (height/8)-20,
    backgroundColor: 'grey',
    borderColor: 'rgba(34, 224, 0, 0.4)',
    borderWidth: 5
  },
  fullModal: {
    backgroundColor: 'white',
    width:width, 
    height:height, 
  },
  info: {
    padding: 5,
    backgroundColor:'white',
    borderColor: 'rgba(34, 224, 0, 0.4)',
    borderWidth: 5

  },
  restImage: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    height: height/8,
    width: height/8
  },
  fullImage: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    height: height/3,
    width: width
  }
});

module.exports = DetailModal;





/*
       
 
*/