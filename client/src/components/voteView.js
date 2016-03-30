'use strict';

var React = require('react-native');
var {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} = React;

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

var windowSize = Dimensions.get('window');

var VoteView = React.createClass({
  render() {
    return (
      <View style={voteStyles.buttonContainer}>
        <TouchableOpacity 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 0)}
          style={[voteStyles.preBad, this.props.vote.bad && voteStyles.bad]}>
          <Image source={{ uri: 'http://www.sherv.net/cm/emoticons/no/big-thumbs-down-smiley-emoticon.gif', width: 41, height: 27 }} />   

        </TouchableOpacity>
        <Text style={voteStyles.traitName}>{traitNames[this.props.traitNum]}</Text>
        <TouchableOpacity 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 1)}
          style={[voteStyles.preGood, this.props.vote.good && voteStyles.good]}>
          <Image source={{ uri: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/blue-jelly-icons-business/078641-blue-jelly-icon-business-thumbs-up.png', width: 31, height: 31 }} />   
        </TouchableOpacity>        
      </View>
    );
  }
});




module.exports = VoteView;

var voteStyles = StyleSheet.create({
  traitName: {
    color: 'grey',
    fontWeight:'bold', 
    fontSize: 14
  },
  buttonContainer: {
    flex:1,
    // backgroundColor: '#f4f3fcolor5',
    flexDirection: 'row',
    height: windowSize.height/14,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  good: {
    height: windowSize.height/16,
    width: windowSize.width/3,
    // backgroundColor: 'green',
    // borderColor: '#48BBEC',
    borderColor: 'green',
    borderWidth:3,
    borderRadius: 30,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row'
  },
  bad: {
    width: windowSize.width/3,
    height: windowSize.height/16,
    // backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 30,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center'
  },
  preGood: {
    height: windowSize.height/16,
    width: windowSize.width/3,
    // backgroundColor: 'white',
    // borderColor: 'green',
    // borderWidth:3,
    // borderRadius: 30,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row'
  },
  preBad: {
    width: windowSize.width/3,
    height: windowSize.height/16,
    // backgroundColor: 'white',
    // borderColor: 'red',
    // borderWidth: 3,
    // borderRadius: 30,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center'
  }
});

  