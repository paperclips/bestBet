var React = require('react-native');
var {
  AppRegistry,
  } = React;

var App = require('./App.js');

var client = React.createClass({
  render() {
    return <App />
  },
});

AppRegistry.registerComponent('client', () => client);
