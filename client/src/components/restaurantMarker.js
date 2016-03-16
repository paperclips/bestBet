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
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.dollar}></Text>
        </View>
      </View>
    );
  },
});

module.exports = RestaurantMarker;
