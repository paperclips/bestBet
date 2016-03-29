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
        <Text >{traitNames[this.props.traitNum]}</Text>
        <TouchableHighlight style={voteStyles.bad}>
          <Text >sdfds</Text>
        </TouchableHighlight>
        <TouchableHighlight style={voteStyles.good}>
          <Text >dsss</Text>
        </TouchableHighlight>        
      </View>
    );
  }
});

      // <View style={styles.buttonContainer}>
      // <TouchableHighlight style={[styles.button1, this.state.buttonPress[0] && styles.button2]} onPress={this.traitsClicked.bind(this, 1)} underlayColor={'black'} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn}>
      //   <Text style={styles.buttonText}>Good Food</Text>
      // </TouchableHighlight>

      // <TouchableHighlight style={[styles.button1, this.state.buttonPress[1] && styles.button2]} onPress={this.traitsClicked.bind(this, 2)} underlayColor='#99d9f4'>
      //   <Text style={styles.buttonText}>Good Drinks</Text>
      // </TouchableHighlight>        



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
  topSpace: {
    marginTop: height/20,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: height/12,
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
    height: height/10,
    width: width/3,
    backgroundColor: 'green',
    borderColor: '#48BBEC',
    borderWidth: 2,
    borderRadius: 5,
    margin: width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  bad: {
    width: width/3,

    height: height/10,
    backgroundColor: 'red',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  error: {
    fontSize: 12,
    color: 'red',
  }
});

  