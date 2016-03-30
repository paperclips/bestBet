'use strict';

var React = require('react-native');
var {
  Text,
  StyleSheet,
  View,
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

var { width, height } = Dimensions.get('window');


// var styles = require('../assets/styles.js').voteStyles;

var VoteView = React.createClass({
  getInitialState() {
    return {
      
    };
  },
  render() {
    return (
      <View style={voteStyles.buttonContainer}>
        <TouchableHighlight 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 0)}
          style={[voteStyles.preBad, this.props.vote.bad && voteStyles.bad]}>
          <Text>Bad</Text>
        </TouchableHighlight>
        <Text style={voteStyles.traitName}>{traitNames[this.props.traitNum]}</Text>
        <TouchableHighlight 
          onPress={this.props.processVote.bind(null, this.props.traitNum, 1)}
          style={[voteStyles.preGood, this.props.vote.good && voteStyles.good]}>
          <Text>Good</Text>
        </TouchableHighlight>        
      </View>
    );
  }
});

module.exports = VoteView;

var voteStyles = StyleSheet.create({
  container: {
    flex:2,
    height: height/2,
    justifyContent: 'center',
    paddingLeft: height/40,
    paddingRight: height/40,
    marginTop: height/45,
    backgroundColor: '#f3f5f4',
  },
  traitName: {
    color: 'white',
    fontWeight:'bold', 
    fontSize: 14
  },
  topSpace: {
    marginTop: height/20,
    backgroundColor: 'black',
  },
  buttonContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    height: height/14,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 3
  },
  button: {
    position: 'absolute',
    top: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  twoButtons: {
    flexDirection: 'row',
    height: height/15, 
    paddingLeft: height/20,
    paddingRight: height/20

  },
  good: {
    height: height/16,
    width: width/3,
    backgroundColor: 'green',
    borderColor: '#48BBEC',
    borderWidth:3,
    borderRadius: 30,
    margin: width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row'
  },
  bad: {
    width: width/3,
    height: height/16,
    backgroundColor: 'red',
    borderColor: '#007dc1',
    borderWidth: 3,
    borderRadius: 30,
    margin: width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center'
  },
  preGood: {
    height: height/16,
    width: width/3,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth:3,
    borderRadius: 30,
    margin: width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'row'
  },
  preBad: {
    width: width/3,
    height: height/16,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 30,
    margin: width/80,
    justifyContent: 'center',
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems: 'center'
  },
  subContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    height: height/14,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    height: height/14,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
    error: {
    fontSize: 12,
    color: 'red',
  }
});

  