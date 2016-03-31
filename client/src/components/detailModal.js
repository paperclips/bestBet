'use strict';
var React = require('react-native');
// import Drawer from 'react-native-drawer';
// var drawer = require('react-native-drawer');
var { 
  Alert,
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
var VoteView = require('./voteView.js');

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
  renderFullUserVotes () {
    var traitTracker = {};
    return (
      <View style={modalStyles.myVotes}
        onPress={this.toggleFull.bind(this)}>
        <Text style={{ fontWeight:'bold', fontSize: 14, color: 'blue' }}> You visited on {this.props.allData.establishments[this.props.estab.id].userVotes[this.props.estab.userVotes.length-1].time}</Text>
          {_.map(this.props.allData.establishments[this.props.estab.id].userVotes, (vote) => {
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
          <Text key={count++} style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{traitNames[trait]}: NOW: {this.props.allData.allTraits[this.props.estab.id][trait].lp} / {this.props.allData.allTraits[this.props.estab.id][trait].lt} USUAL:{this.props.allData.allTraits[this.props.estab.id][trait].hp} / {this.props.allData.allTraits[this.props.estab.id][trait].ht} </Text>
        ))}
        <Text> Other </Text>
        {_.map(nums,(num) => (
          <View key={count++}>
          {this.props.userTraits.indexOf(num) < 0 && <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[num]}: NOW: {this.props.allData.allTraits[this.props.estab.id][num].lp} / {this.props.allData.allTraits[this.props.estab.id][num].lt} USUAL:{this.props.allData.allTraits[this.props.estab.id][num].hp} / {this.props.allData.allTraits[this.props.estab.id][num].ht} </Text>}
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
    //voteData is an object {establishmentId, userId, time, votes:{1: 0 or 1, 2: 0 or 1, 3: 0 or 1...}}
    var voteData = {establishmentId: this.props.estab.id, userId: this.props.user.id, time: new Date()};
    voteData.votes = {};
    Object.keys(this.state.votes).forEach((traitId) => {
      if(this.state.votes[traitId].good){
        voteData.votes[traitId] = 1;
      } else if(this.state.votes[traitId].bad){
        voteData.votes[traitId] = 0;
      }
    });

    // Send votes thru socket
    this.props.sendVote(this.props.socket, voteData);
    
    // give ALERT thanking user
    Alert.alert('Thanks!','You votes has been counted!');

    // reset votes in state, turn off voting, turn off full
    this.setState({voting:false, 
                   full: false, 
                   votes:{1: {bad: false, good: false},
                          2: {bad: false, good: false},
                          3: {bad: false, good: false},
                          4: {bad: false, good: false},
                          5: {bad: false, good: false},
                          6: {bad: false, good: false},
                          7: {bad: false, good: false},
                          8: {bad: false, good: false},
                          9: {bad: false, good: false}}});
  }

  renderVoteScreen () {
    return (
      <TouchableHighlight onPress={null}> 
        <View style={modalStyles.voteScreen}> 
          <View> 
            <Text style={modalStyles.voteSectionHeader}> Your Preferences </Text>
            {_.map(this.props.userTraits,(trait) => (
              <VoteView key={count++}
                traitNum={trait}
                estab={this.props.estab.id}
                vote={this.state.votes[trait]}
                processVote={this.processVote.bind(this)}/>
            ))}
            <Text style={modalStyles.voteSectionHeader}> Other Categories </Text>
            {_.map(nums,(num) => (
              <View key={count++}>
                {this.props.userTraits.indexOf(num) >= 0 ? null : 
                  <VoteView
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
          <Text>{this.props.estab.address} ({this.props.estab.phoneNumber != null ? this.props.estab.phoneNumber.slice(3) : "No Phone"})</Text> 
          <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.allData.userComboScore[this.props.estab.id].liveScore} / 10 USUAL: {this.props.allData.userComboScore[this.props.estab.id].histScore} / 10</Text>
      </View>
    )
  }

          //   <Image
          // style={modalStyles.briefImage}
          // source={{uri: this.props.estab.imageUrl}}/>  
  renderVoteHeader () {
    return (
     <View style={modalStyles.briefModal}>
          <View style={modalStyles.voteHeader}> 
            <Text style={{ paddingTop: 20, flex:2, fontWeight:'bold', fontSize: 20, alignSelf: 'center', color: '#0F172E' }}> How was {this.props.estab.name}?</Text>
            <View style={{height: 2, margin: 10, backgroundColor: 'grey'}}></View>
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
            <Text style={{ flex: 1.3, textAlign: 'right', fontWeight:'bold', fontSize: 15, color: 'red' }}>{this.props.estab.name}   <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW: {this.props.allData.userComboScore[this.props.estab.id].liveScore} / 10 USUAL: {this.props.allData.userComboScore[this.props.estab.id].histScore} / 10</Text></Text>
            {_.map(this.props.userTraits,(trait) => (
              <Text key={count++} style={{flex: 1, textAlign: 'right', fontWeight:'bold', fontSize: 12, color: 'green' }}>{traitNames[trait]}: NOW: {this.props.allData.allTraits[this.props.estab.id][trait].lp} / {this.props.allData.allTraits[this.props.estab.id][trait].lt} USUAL:{this.props.allData.allTraits[this.props.estab.id][trait].hp} / {this.props.allData.allTraits[this.props.estab.id][trait].ht} </Text>
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
  ex: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20
  },
  briefModal: {
    flex: 2,
    flexDirection:'row',
    width:width, 
    // height:height/8 , 
    backgroundColor:'#F5F2E0', //left side of the box
    borderTopColor: '#E4DFAF',
    borderTopWidth: 3,
  },
  briefInfo: {
    flex:5, 
    // alignSelf: 'flex-end',
    padding: 10,
    height: height/8,
    // width: width - (height/8)-20,
    backgroundColor: '#F5F2E0', //right side of the box
    // borderTopColor: 'grey',
    // borderTopWidth: 3,
    // borderColor: 'rgba(34, 224, 0, 0.4)',
    // borderWidth: 1
  },
  fullModal: {
    backgroundColor: 'white',
    width:width, 
    height:height, 
  },
  info: {
    padding: 5,
    // backgroundColor:'white',
    borderColor: 'rgba(34, 224, 0, 0.4)',
    borderWidth: 5
  },
  briefImage: {
    marginTop: -25,
    borderWidth: 3,
    borderColor: '#E4DFAF',
    // paddingLeft: 30,
    marginLeft: 30,
    borderRadius: 50,
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    height: 100,
    width: 100,
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
    // backgroundColor: 'grey',
  },
  voteButton: {
    width: width-width/6,
    height: height/10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
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
  voteHeader: {  //voteview top question area
    flex:2, 
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
    // height: height/8,
    width: width - (height/8)-20,
    backgroundColor: 'white',
    // borderColor: 'rgba(34, 224, 0, 0.4)',
    // borderWidth: 5
  },
  voteSectionHeader: {
    padding: 10,
    paddingLeft: 25,
    fontWeight:'bold',
    backgroundColor: 'white',
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#0F172E', //color for your preferences
    alignItems: 'center'
  },
  voteHeaderText: {
    textAlign: 'center'
  },
  submitVote: {
    flex: 2,
    width: 384,
    padding: 20,
    paddingTop: 20,
    // height: height/10,
    backgroundColor: '#BAD1E8', //universalblue
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#2F56E9',
    borderWidth: 3,
    borderRadius: 6,
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