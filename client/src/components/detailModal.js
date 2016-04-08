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
var modalStyles = require('../assets/styles.js').modalStyles;
var scoreStyles = require('../assets/styles.js').scoreStyles;
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
      <View>
        <View style={modalStyles.myVotes}
          onPress={this.toggleFull.bind(this)}>
          <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black', textAlign: 'right'}}> You visited on {new Date(this.props.allData.establishments[this.props.estab.id].userVotes[this.props.estab.userVotes.length-1].time).toDateString()}</Text>
          <Text style={{ textAlign: 'right'}}>You said: </Text>
            {_.map(this.props.allData.establishments[this.props.estab.id].userVotes, (vote) => {
              if(!traitTracker.hasOwnProperty(vote.traitId)) {
                traitTracker[vote.traitId] = true;
                var col = vote.voteValue ? 'green' : 'red';
                return <Text key={count++}  style={{fontWeight:'bold', fontSize: 12, color: col, textAlign: 'right' }}> {vote.voteValue ? "good" : "bad"} for {traitNames[vote.traitId]} </Text>
              }
            })}
        </View>
        <View style={{height: 2, marginLeft: 30, backgroundColor: '#3366CC', marginTop: 3}}></View>
      </View>
    )
  }

  renderFullDetails () {
    return (
      <View style={modalStyles.info}
        onPress={this.toggleFull.bind(this)}>

        <Text style={{ fontSize: 13, fontWeight:'bold', paddingLeft: 5}}> Your Preferences </Text>
        {_.map(this.props.userTraits,(trait) => (
          <View key={count++} style={{flexDirection: 'row',alignItems: 'flex-start', justifyContent: 'flex-start', padding:1}}>

            <Text style={{flex: 1, textAlign: 'left', fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[trait]}:</Text>

            <View style={{flexDirection:'row'}}>
              {this.props.allData.allTraits[this.props.estab.id][trait].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Now: </Text> : null}
              <View style={scoreStyles[(10*this.props.allData.allTraits[this.props.estab.id][trait].lp === 0 && this.props.allData.allTraits[this.props.estab.id][trait].lt!==0) ? 1 :  Math.round(10*this.props.allData.allTraits[this.props.estab.id][trait].lp / this.props.allData.allTraits[this.props.estab.id][trait].lt)]}/>
              {this.props.allData.allTraits[this.props.estab.id][trait].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> ({this.props.allData.allTraits[this.props.estab.id][trait].lt})</Text> : null}
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Usual: </Text>
              <View style={scoreStyles[Math.ceil(10*this.props.allData.allTraits[this.props.estab.id][trait].hp / this.props.allData.allTraits[this.props.estab.id][trait].ht)]}/>
            </View>

          </View>))}
        <Text style={{ fontSize: 12, fontWeight:'bold', paddingLeft: 5}}> Other Preferences </Text>
        {_.map(nums,(num) => (
          <View key={count++} >
          {this.props.userTraits.indexOf(num) < 0 &&
            <View style={{flexDirection: 'row',alignItems: 'flex-start', justifyContent: 'flex-start', padding:1}}>
            <Text style={{flex: 1, textAlign: 'left', fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[num]}:</Text>

            <View style={{flexDirection:'row'}}>
              {this.props.allData.allTraits[this.props.estab.id][num].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Now: </Text> : null}
              <View style={scoreStyles[(10*this.props.allData.allTraits[this.props.estab.id][num].lp === 0 && this.props.allData.allTraits[this.props.estab.id][num].lt!==0) ? 1 :  Math.round(10*this.props.allData.allTraits[this.props.estab.id][num].lp / this.props.allData.allTraits[this.props.estab.id][num].lt)]}/>
              {this.props.allData.allTraits[this.props.estab.id][num].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> ({this.props.allData.allTraits[this.props.estab.id][num].lt})</Text> : null}
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Usual: </Text>
              <View style={scoreStyles[Math.ceil(10*this.props.allData.allTraits[this.props.estab.id][num].hp / this.props.allData.allTraits[this.props.estab.id][num].ht)]}/>
            </View>

          </View>}
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
    Alert.alert("Got it!","We'll remind you next time you go out.");

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
      <TouchableHighlight style={modalStyles.submitVote} onPress={this.toggleVoting.bind(this)}>
        <View>
          <Text style={modalStyles.subText}>Rate It Now</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderFullDetailHeader () {
    return (

      <View style={modalStyles.fullName}
        onPress={this.toggleFull.bind(this)}>
          <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name} </Text>
          <Text>{this.props.estab.address} </Text><Text>{this.props.estab.phoneNumber != null ? this.props.estab.phoneNumber.slice(3) : ""}</Text>

          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>

            <View style={{flexDirection:'row'}}>
              {this.props.allData.userComboScore[this.props.estab.id].liveScore ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}>    NOW:  </Text> : null}
              <View style={scoreStyles[this.props.allData.userComboScore[this.props.estab.id].liveScore]}/>
              </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}>    USUAL:  </Text>
              <View style={scoreStyles[this.props.allData.userComboScore[this.props.estab.id].histScore]}/>
            </View>
          </View>

          </View>

    )
  }

  renderVoteHeader () {
    return (
      <View>
          <View style={modalStyles.voteHeader}>
            <Text style={{ paddingTop: 20, flex:2, fontWeight:'bold', fontSize: 20, alignSelf: 'center', color: '#0F172E' }}> How was {this.props.estab.name}?</Text>
          </View>
          <View style={{height: 2, marginLeft: 30, backgroundColor: 'grey'}}></View>
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

            <View style={{height: 2, marginLeft: 30, backgroundColor: '#3366CC'}}></View>


            <View onPress={this.toggleFull.bind(this)}>
              {this.props.estab.userVotes.length&&!this.state.voting ? this.renderFullUserVotes() : null}
              {this.state.voting ? null : this.renderFullDetails()}
            </View>


            {this.state.voting ? this.renderVoteScreen() : this.renderVoteButton()}

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
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', alignSelf: 'center',alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View>
                    <Text style={{textAlign: 'left',fontWeight:'bold', fontSize: 16, color: 'black' }}>{this.props.estab.name}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                    {this.props.allData.userComboScore[this.props.estab.id].liveScore ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}>    NOW:  </Text> : null}
                    <View style={scoreStyles[this.props.allData.userComboScore[this.props.estab.id].liveScore]}/>
                    </View>
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}>    USUAL:  </Text>
                    <View style={scoreStyles[this.props.allData.userComboScore[this.props.estab.id].histScore]}/>
                    </View>
                  </View>

            </View>

            {_.map(this.props.userTraits,(trait) => (
              <View key={count++} style={{flexDirection: 'row',alignItems: 'flex-start', justifyContent: 'flex-start', padding:1}}>
              <Text style={{flex: 1, textAlign: 'left', fontWeight:'bold', fontSize: 12, color: 'black' }}>{traitNames[trait]}:</Text>
                <View style={{flexDirection:'row'}}>
                  {this.props.allData.allTraits[this.props.estab.id][trait].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Now: </Text> : null}
                  <View style={scoreStyles[(10*this.props.allData.allTraits[this.props.estab.id][trait].lp === 0 && this.props.allData.allTraits[this.props.estab.id][trait].lt!==0) ? 1 :  Math.round(10*this.props.allData.allTraits[this.props.estab.id][trait].lp / this.props.allData.allTraits[this.props.estab.id][trait].lt)]}/>
                  {this.props.allData.allTraits[this.props.estab.id][trait].lt!==0 ? <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> ({this.props.allData.allTraits[this.props.estab.id][trait].lt})</Text> : null}
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 11, color: 'black' }}> Usual: </Text>
                  <View style={scoreStyles[Math.ceil(10*this.props.allData.allTraits[this.props.estab.id][trait].hp / this.props.allData.allTraits[this.props.estab.id][trait].ht)]}/>
                </View>
              </View>
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

module.exports = DetailModal;

/*
//  <Text style={{ fontWeight:'bold', fontSize: 12, color: 'black' }}>NOW:</Text>
//               <Text key={count++} style={{flex: 1, textAlign: 'right', fontWeight:'bold', fontSize: 12, color: 'green' }}>{traitNames[trait]}: NOW: {this.props.allData.allTraits[this.props.estab.id][trait].lp} / {this.props.allData.allTraits[this.props.estab.id][trait].lt} USUAL:{this.props.allData.allTraits[this.props.estab.id][trait].hp} / {this.props.allData.allTraits[this.props.estab.id][trait].ht} </Text>
*/
