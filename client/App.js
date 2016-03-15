var React = require('react-native');
var {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} = React;
var DisplayLatLng = require('./example/examples/DisplayLatLng');
var ViewsAsMarkers = require('./example/examples/ViewsAsMarkers');
var EventListener = require('./example/examples/EventListener');
var MarkerTypes = require('./example/examples/MarkerTypes');
var DraggableMarkers = require('./example/examples/DraggableMarkers');
var PolygonCreator = require('./example/examples/PolygonCreator');
var AnimatedViews = require('./example/examples/AnimatedViews');
var AnimatedMarkers = require('./example/examples/AnimatedMarkers');
var Callouts = require('./example/examples/Callouts');
var Overlays = require('./example/examples/Overlays');
var DefaultMarkers = require('./example/examples/DefaultMarkers');


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
      [DisplayLatLng, 'Tracking Position'],
      [ViewsAsMarkers, 'Arbitrary Views as Markers'],
      [EventListener, 'Events'],
      [MarkerTypes, 'Image Based Markers'],
      [DraggableMarkers, 'Draggable Markers'],
      [PolygonCreator, 'Polygon Creator'],
      [AnimatedViews, 'Animating with MapViews'],
      [AnimatedMarkers, 'Animated Marker Position'],
      [Callouts, 'Custom Callouts'],
      [Overlays, 'Circles, Polygons, and Polylines'],
      [DefaultMarkers, 'Default Markers'],
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
