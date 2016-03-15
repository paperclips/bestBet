/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict';
// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// class client extends Component {
//   render() {
//       return <App />
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

//AppRegistry.registerComponent('client', () => client);


// var React = require('react-native');
// var {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
//   } = React;

// var App = require('./App');

// class client extends Component {
//   render() {
//       return <App />
//   }
// }

// AppRegistry.registerComponent('AirMapsExplorer', () => AirMapsExplorer);
// AppRegistry.registerComponent('client', () => client);


var React = require('react-native');
var {
  AppRegistry,
  } = React;

var App = require('./App');

var AirMapsExplorer = React.createClass({
  render() {
    return <App />
  },
});

AppRegistry.registerComponent('AirMapsExplorer', () => AirMapsExplorer);
