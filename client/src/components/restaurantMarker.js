// rest marker view

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

var styles = require('../assets/styles.js').markerStyles;


var RestaurantMarker = React.createClass({
  getDefaultProps() {
    return {
      fontSize: 13,
    };
  },
  render() {
    return (
      <View ref="m1"style={styles.container}>
        <View style={styles.bubble}>
        </View>
      </View>
    );
  },
});

module.exports = RestaurantMarker;
