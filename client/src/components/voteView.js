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
        <TouchableHighlight 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 0)}
          style={[voteStyles.preBad, this.props.vote.bad && voteStyles.bad]}>
        <Text style={voteStyles.choiceBadText}>BAD</Text>
        </TouchableHighlight>
        <Text style={voteStyles.traitName}>{traitNames[this.props.traitNum]}</Text>
        <TouchableHighlight 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 1)}
          style={[voteStyles.preGood, this.props.vote.good && voteStyles.good]}>
        <Text style={voteStyles.choiceGoodText}>GOOD</Text>

        </TouchableHighlight>        
      </View>
    );
  }
});



          // <Image source={require('../assets/upp.png')} style={{width: 31, height: 31}}/>   

module.exports = VoteView;

var voteStyles = StyleSheet.create({
  traitName: {
    color: 'black',
    // fontWeight:'bold',
    fontSize: 16,
  },
  choiceGoodText: {
    color: '#36A156',//#36A156
  },
  choiceBadText: {
    color: '#B8433d',
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    height: windowSize.height/14,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  good: {
    height: windowSize.height/16,
    width: windowSize.width/3,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 6,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor: '#B0E4AF',
  },
  bad: {
    width: windowSize.width/3,
    height: windowSize.height/16,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 6,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#EBC2D1',
  },
  preGood: {
    height: windowSize.height/16,
    width: windowSize.width/3,
    margin: windowSize.width/80,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row'
  },
  preBad: {
    width: windowSize.width/3,
    height: windowSize.height/16,
    // backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    // borderRadius: 30,
    margin: windowSize.width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center'
  }
});

  