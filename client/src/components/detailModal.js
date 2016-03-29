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

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

var _ = require('underscore');

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
var count2 = 1

var count3 = 1
var VoteView = require('./voteView.js')

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight* 0.5),
      full: false,
      voting: false,
      votes: {
        1: {bad: false, good: false},
        2: {bad: false, good: false},
        3: {bad: false, good: false},
        4: {bad: false, good: false},
        5: {bad: false, good: false},
        6: {bad: false, good: false},
        7: {bad: false, good: false},
        8: {bad: false, good: false},
        9: {bad: false, good: false}
      },
    }
  }
  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }
  toggleFull () {
    this.setState({full:!this.state.full});
  }
  toggleVoting () {
    this.setState({voting:!this.state.voting});
  }
  renderLiveScore (trait) {
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
  } 
  renderFullUserVotes () {
    var traitTracker = {};
    return (
      <View style={modalStyles.myVotes}
        onPress={this.toggleFull.bind(this)}>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'blue' }}> You visited on {this.props.estab.userVotes[this.props.estab.userVotes.length-1].time}</Text>
          {_.map(this.props.estab.userVotes, (vote) => {
            if(!traitTracker.hasOwnProperty(vote.traitId)) {
              traitTracker[vote.traitId] = true;
              return <Text key={count++}  style={{fontWeight:'bold', fontSize: 12, color: 'purple' }}>{traitNames[vote.traitId]}: {vote.voteValue.toString()} on {vote.time} </Text>
            }
          })}
      </View>
    )
  }
  renderFullDetails () {
    return (
      <View style={modalStyles.info}
        onPress={this.toggleFull.bind(this)}>  
        {_.map(this.props.userTraits,(trait) => (
          <Text key={trait} style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[trait]}: NOW: {this.renderLiveScore(trait).pos} / {this.renderLiveScore(trait).tot} USUAL:{this.props.estab['trait'+ trait +'Pos']} / {this.props.estab['trait'+ trait +'Tot']} </Text>
        ))}
        <Text> Other </Text>
        {_.map(nums,(num) => (
          <View key={num}>
          {this.props.userTraits.indexOf(num) >= 0 && <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[num]}: NOW: {this.renderLiveScore(num).pos} / {this.renderLiveScore(num).tot} USUAL:{this.props.estab['trait'+ num +'Pos']} / {this.props.estab['trait'+ num +'Tot']} </Text>}
          </View>
        ))}
      </View>
    )
  }
  renderSubmitButton () {
    return (
      <TouchableHighlight  onPress={this.onVoteSubmit.bind(this)}>
        <View style={modalStyles.submitVote}>
          <Text style={modalStyles.subText}> Submit Votes </Text>
        </View>
      </TouchableHighlight>
    )
  }
  processVote (trait, value) {
    console.log(this.state.votes);
    var voteVals = this.state.votes;
    if(value === 0) {// if it's a vote for bad
      if(voteVals[trait].bad) { // if bad was selected, all should be false
        voteVals[trait].bad = false;
      } else { // else, bad should be true and good false
        voteVals[trait] = {bad: true, good: false};;
      }
    } else { // if it's a vote for good
      if(voteVals[trait].good && !voteVals[trait].bad) { // if good was  selected, we should end up with everything false
        voteVals[trait].good = false;
      } else { // else, bad should be false and good should be true
        voteVals[trait] = {bad: false, good:true};
      }
    }
    this.setState({votes: voteVals});
  }
  onVoteSubmit () {
    console.log('IN on vote SUBMIT, this will send out the vote');

    // send votes up from state
    // reset votes in state
    // turn off voting
    // turn off full
    // give ALERT thanking user
    this.setState({voting:false, full: false});
  }
  renderVoteScreen () {
    return (
      <TouchableHighlight onPress={null}> 
        <View style={modalStyles.voteScreen}> 
          <View> 
            <Text style={modalStyles.voteSectionHeader}> Your Preferences </Text>
            {_.map(this.props.userTraits,(trait) => (
              <VoteView key={trait}
                traitNum={trait}
                estab={this.props.estab.id}
                vote={this.state.votes[trait]}
                processVote={this.processVote.bind(this)}/>
            ))}
            <Text style={modalStyles.voteSectionHeader}> Other Categories </Text>
            {_.map(nums,(num) => (
              <View>
                {this.props.userTraits.indexOf(num) >= 0 ? null : 
                  <VoteView key={num}
                    traitNum={num}
                    estab={this.props.estab.id}
                    vote={this.state.votes[num]}
                    processVote={this.processVote.bind(this)}/>}
              </View>
            ))}
        </View>
        {this.renderSubmitButton()}
      </View>
    </TouchableHighlight>
    )
  }
  renderVoteButton () {
    return(
      <TouchableHighlight style={modalStyles.voteButton} onPress={this.toggleVoting.bind(this)}>
        <View>
          <Text style={modalStyles.voteButtonText}> Note How It Was </Text>
        </View>
      </TouchableHighlight>
    )
  }
  renderFullDetailHeader () {
    return (
      <View style={modalStyles.fullName}
        onPress={this.toggleFull.bind(this)}>  
          <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name} </Text> 
          <Text>{this.props.estab.address} ({this.props.estab.phoneNumber.slice(3)})</Text> 
          <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.live} / 10 USUAL: {this.props.hist} / 10</Text>
      </View>
    )
  }
  renderVoteHeader () {
    return (
     <View style={modalStyles.briefModal}>
          <Image
          style={modalStyles.briefImage}
          source={{uri: this.props.estab.imageUrl}}/>  
          <View style={modalStyles.voteHeader}> 
            <Text style={{ fontWeight:'bold', fontSize: 20, alignSelf: 'center', color: 'black' }}> How was {this.props.estab.name}?</Text>
          </View>
      </View>
    )  
  }
  renderFull () {
    var big = this.props.estab.imageUrl.replace('ms.','l.');
    return (
      <TouchableHighlight onPress={this.toggleFull.bind(this)}>
        <View style={modalStyles.fullModal}>
          
          <View> 
            {this.state.voting ? null : <Image
              onPress={this.toggleFull.bind(this)}
              style={modalStyles.fullImage}
              source={{uri: big}}/>}
            {this.state.voting ? this.renderVoteHeader() : this.renderFullDetailHeader()}
            
            {this.state.voting ? this.renderVoteScreen() : this.renderVoteButton()}

            <View onPress={this.toggleFull.bind(this)}>
              {this.props.estab.userVotes.length&&!this.state.voting ? this.renderFullUserVotes() : null}
              {this.state.voting ? null : this.renderFullDetails()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  renderBrief () {
    return (
      <TouchableHighlight  onPress={this.toggleFull.bind(this)}>
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
  }
  render () {
    return (
      <View>
        {this.state.full ? this.renderFull() : this.renderBrief()}
      </View>  
    )
  }
};


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
    width: width-width/6,
    height: height/10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 50,
    margin: width/80,
    justifyContent: 'center',
  },
  voteButtonText: {
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold',
  },
  voteHeader: {
    flex:3, 
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    height: height/8,
    width: width - (height/8)-20,
    backgroundColor: 'white',
    borderColor: 'rgba(34, 224, 0, 0.4)',
    borderWidth: 5
  },
  voteSectionHeader: {
    fontWeight:'bold',
    backgroundColor: 'grey',
    fontSize: 14,
    color: 'black',
    alignItems: 'center'
  },
  voteHeaderText: {
    textAlign: 'center'
  },
  submitVote: {
    width: width-width/6,
    height: height/10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
    margin: width/80,
    justifyContent: 'center',
  },
  subText: {
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold',
  }
});

module.exports = DetailModal;

//<Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[0]]}: NOW: {this.renderLiveScore(this.props.userTraits[0]).pos} / {this.renderLiveScore(this.props.userTraits[0]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[0] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[0] +'Tot']} </Text>
//        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[1]]}: NOW: {this.renderLiveScore(this.props.userTraits[1]).pos} / {this.renderLiveScore(this.props.userTraits[1]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[1] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[1] +'Tot']} </Text>
//        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[this.props.userTraits[2]]}: NOW: {this.renderLiveScore(this.props.userTraits[2]).pos} / {this.renderLiveScore(this.props.userTraits[2]).tot} USUAL:{this.props.estab['trait'+ this.props.userTraits[2] +'Pos']} / {this.props.estab['trait'+ this.props.userTraits[2] +'Tot']} </Text>




/*
       add back
 onPress={this.toggleFull}
 to the individual elements in the full view
*/