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
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image

} = React;

var _ = require('underscore');

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

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

var nums = [1,2,3,4,5,6,7,8,9];
var count = 1;
var styles = require('../assets/styles.js'); // mapStyles
var { width, height } = Dimensions.get('window');

var VoteView = require('./voteView.js')

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');


var DetailModal =  React.createClass({
  getInitialState: function() {
    return { 
      offset: new Animated.Value(deviceHeight* 0.5),
      full: false,
      voting: false
    }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  },
  toggleFull: function() {
    console.log('togg?');
    var old = this.state.full;
    this.setState({full:!old});
  },
  toggleVoting: function() {
    var oldVote = this.state.voting;
    this.setState({voting:!oldVote});
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
  renderFullUserVotes: function () {
    var traitTracker = {};
    return (
      <View style={modalStyles.myVotes}
        onPress={this.toggleFull}>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'blue' }}> You visited on {this.props.estab.userVotes[this.props.estab.userVotes.length-1].time}</Text>
          {_.map(this.props.estab.userVotes, (vote) => {
            if(!traitTracker.hasOwnProperty(vote.traitId)) {
              traitTracker[vote.traitId] = true;
              return <Text key={count++}  style={{fontWeight:'bold', fontSize: 12, color: 'purple' }}>{traitNames[vote.traitId]}: {vote.voteValue.toString()} on {vote.time} </Text>
            }
          })}
      </View>
    )
  },
  subMaskReturnPreventer: function () {
    console.log('h');
  },
  renderFullDetails: function () {
    return (
      <View style={modalStyles.info}
        onPress={this.toggleFull}>  
        {_.map(this.props.userTraits,(trait) => (
          <Text key={trait} style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[trait]}: NOW: {this.renderLiveScore(trait).pos} / {this.renderLiveScore(trait).tot} USUAL:{this.props.estab['trait'+ trait +'Pos']} / {this.props.estab['trait'+ trait +'Tot']} </Text>
        ))}
        <Text> Other </Text>
        {_.map(nums,(num) => (
          <View key={num}>
          {this.props.userTraits.indexOf(num) >= 0 ? null : <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[num]}: NOW: {this.renderLiveScore(num).pos} / {this.renderLiveScore(num).tot} USUAL:{this.props.estab['trait'+ num +'Pos']} / {this.props.estab['trait'+ num +'Tot']} </Text>}
          </View>
        ))}
      </View>
    )
  },
  renderVoteScreen: function () {
    return (
      <TouchableHighlight onPress={null}> 
        
        <View style={modalStyles.voteScreen}>  
          {_.map(this.props.userTraits,(trait) => (
            <VoteView key ={trait}
              traitNum={trait}
              estab={this.props.estab.id}/>
          ))}
          <Text> Other </Text>
          {_.map(nums,(num) => (
            <View>
            {this.props.userTraits.indexOf(num) >= 0 ? null : 
              <VoteView key ={num}
                traitNum={num}
                estab={this.props.estab.id}/>}
            </View>
          ))}
        </View>
      </TouchableHighlight>
    )
  },
  renderVoteButton: function () {
    return(
      <TouchableHighlight style={modalStyles.voteButton} onPress={this.toggleVoting}>
        <View>
          <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}> Remember How It Was </Text>
        </View>
      </TouchableHighlight>
    )
  },
  renderFull: function () {
    var big = this.props.estab.imageUrl.replace('ms.','l.');
    return (
      <TouchableHighlight onPress={this.toggleFull}>
        <View style={modalStyles.fullModal}>
          
          <View> 
            {this.state.voting ? null : <Image
              onPress={this.toggleFull}
              style={modalStyles.fullImage}
              source={{uri: big}}/>}
            <View style={modalStyles.fullName}
              onPress={this.toggleFull}>  
              <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name} </Text> 
              <Text>{this.props.estab.address} ({this.props.estab.phoneNumber.slice(3)})</Text> 
              <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text>
            </View>
            {this.state.voting ? this.renderVoteScreen() : this.renderVoteButton()}

            <View  onPress={this.toggleFull}>
              {this.props.estab.userVotes.length&&!this.state.voting ? this.renderFullUserVotes() : null}
              {this.state.voting ? null : this.renderFullDetails()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },
  renderBrief: function () {
    return (
      <TouchableHighlight  onPress={this.toggleFull}>
        <View style={modalStyles.briefModal}>
          <Image
          style={modalStyles.briefImage}
          source={{uri: this.props.estab.imageUrl}}/>  
          <View style={modalStyles.briefInfo}> 
            <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name}   <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text></Text>
            {_.map(this.props.userTraits,(trait) => (
              <Text key={trait} style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[trait]}: NOW: {this.renderLiveScore(trait).pos} / {this.renderLiveScore(trait).tot} USUAL:{this.props.estab['trait'+ trait +'Pos']} / {this.props.estab['trait'+ trait +'Tot']} </Text>
            ))}
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render: function() {
    // console.log("render? ", this.props);
    return (
      <View>
        {this.state.full ? this.renderFull() : this.renderBrief()}
      </View>  
    )
  }
});

var modalStyles = StyleSheet.create({
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
    backgroundColor: 'white',
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
  briefImage: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    height: height/8,
    width: height/8
  },
  fullImage: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    width:width,
    height: height/3
  },
  fullName: {
    padding: 5,
    backgroundColor:'white',
    borderColor: 'red',
    borderWidth: 5
  },
  myVotes: {
    padding: 5,
    backgroundColor:'white',
    borderColor: 'blue',
    borderWidth: 5
  },
  voteScreen: {
    backgroundColor: 'grey',
  },
  voteButton: {
    backgroundColor: 'pink',
    height: height/12
  }
});

module.exports = DetailModal;





/*
       add back
 onPress={this.toggleFull}
 to the individual elements in the full view
*/