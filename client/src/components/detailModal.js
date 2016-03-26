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


var {
  height: deviceHeight
} = Dimensions.get('window');

var DetailModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight* 0.5) }
  },
  componentDidMount: function() {
    console.log("compMOUNT");
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
  render: function() {
    console.log("render?");
    return (
        <Animated.View style={[modalstyles.modal, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: 'blue'}}>mymodal!</Text>
          </TouchableOpacity>
        </Animated.View>
    )
  }
});

var modalstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,200,0,.8)',
    position: 'absolute',
    top: 300,
    right: 0,
    bottom: 0,
    left: 0
  }
});

module.exports = DetailModal;