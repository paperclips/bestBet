import React, { Component } from 'react-native';
import MapView from 'react-native-maps';
 
const {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} = React;
 
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
 
class App extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
    };
  }
 
  onRegionChange = (region) => {
    this.setState({ region });
  };
 
  jumpToRandom = () => {
    this.setState({ region: this.getRandomRegion() });
  };
 
  animateToRandom = () => {
    this.refs.map.animateToRegion(this.getRandomRegion());
  };
 
  getRandomRegion = () => {
    let { region } = this.state;
    return {
        ...this.state.region,
        latitude: region.latitude + (Math.random() - 0.5) * region.latitudeDelta / 2,
        longitude: region.longitude + (Math.random() - 0.5) * region.longitudeDelta / 2,
    };
  };
 
  render() {
    return (
      <View
        style={styles.container}
      >
        <MapView
          ref="map"
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View
            style={[styles.bubble, styles.latlng]}
        >
          <Text
            style={{ textAlign: 'center'}}
          >
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>
        <View
            style={styles.buttonContainer}
        >
          <TouchableOpacity
            onPress={this.jumpToRandom}
            style={[styles.bubble, styles.button]}
          >
            <Text>Jump!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.animateToRandom}
            style={[styles.bubble, styles.button]}
          >
            <Text>Animate!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
 
let styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
 
export default client;