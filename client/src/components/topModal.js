'use strict';
var React = require('react-native');
import Drawer from 'react-native-drawer';
// var drawer = require('react-native-drawer');
var t = require('tcomb-form-native');
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

var TopModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight* 0.5) }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  render: function() {
    return (
        <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: 'black'}}>Close Menu</Text>
          </TouchableOpacity>
        </Animated.View>
    )
  }
});


var styles = StyleSheet.create({
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

export default TopModal;