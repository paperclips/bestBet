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

var styles = require('../assets/styles.js'); // mapStyles

var { width, height } = Dimensions.get('window');

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

var DetailModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight* 0.5) }
  },
  componentDidMount: function() {
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
    return (
      <View style={modalStyles.modal} onPress={this.closeModal}>
       <Text style={{ fontWeight:'bold', fontSize: 14, color: 'black' }}>{this.props.estab.name} {this.props.estab.address}</Text>


      </View>
    )
  }
});

var modalStyles = StyleSheet.create({
  modal: {
    padding: 5,
    width:width, 
    height:height/8, 
    backgroundColor:'white',
    borderColor: 'rgba(34, 224, 0, 0.3)',
    borderWidth:5,

  }
});

module.exports = DetailModal;

/*
 <Animated.View style={[modalstyles.modal, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: 'black'}}>mymodal!</Text>
          </TouchableOpacity>
        </Animated.View>
*/