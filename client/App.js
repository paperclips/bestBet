var React = require('react-native');
var {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} = React;

var token = true;

var DisplayLatLng = require('./src/components/map.js');

var App = React.createClass({

  getInitialState() {
    return { Component: null };
  },

  renderExample([Component, title], i) {
    return (
      <TouchableOpacity
        key={i}
        style={styles.button}
        onPress={() => this.setState({ Component })}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.back}
        onPress={() => this.setState({ Component: null })}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>&larr;</Text>
      </TouchableOpacity>
    );
  },

  renderExamples(examples) {
    var { Component } = this.state;
    return (
      <View style={styles.container}>
        {Component && <Component />}
        {Component && this.renderBackButton()}
        {!Component && (
          <ScrollView
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}>
            {examples.map(this.renderExample)}
          </ScrollView>
        )}
      </View>
    );
  },

  render() {
    return this.renderExamples([
      [DisplayLatLng, 'Tracking Position']
    ]);
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = App;
