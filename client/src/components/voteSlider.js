'use strict';

var React = require('react-native');
var {
  SliderIOS,
  Text,
  StyleSheet,
  View,
} = React;

var traitNames = {
  1:'Food', 
  2:'Drinks', 
  3:'Value', 
  4:'Not Noisy', 
  5:'Not Crowded', 
  6:'No Wait',
  7:'Service',
  8:'Upscale', 
  9:'Veggie'
};

var SliderExample = React.createClass({
  getInitialState() {
    return {
      value: 2,
      word: '?'
    };
  },

  render() {
    // console.log(this.props);
    var vals = {
      1: traitNames[this.props.traitNum]+': bad',
      2: traitNames[this.props.traitNum],
      3: traitNames[this.props.traitNum]+': good' 
    };
    return (
      <View>
        <Text style={styles.text} >
          {vals[this.state.value]}
        </Text>
        <SliderIOS
          style={styles.slider}
          {...this.props}
          onValueChange={(val) => this.setState({value: val})} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  slider: {
    height:10,
    margin: 50
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = SliderExample;

exports.title = '<SliderIOS>';
exports.displayName = 'SliderExample';
exports.description = 'Slider input for numeric values';
exports.examples = [
  {
    title: 'Default settings',
    render(): ReactElement {
      return <SliderExample />;
    }
  },
  {
    title: 'minimumValue: -1, maximumValue: 2',
    render(): ReactElement {
      return (
        <SliderExample
          minimumValue={-1}
          maximumValue={2}
        />
      );
    }
  },
  {
    title: 'step: 0.25',
    render(): ReactElement {
      return <SliderExample step={0.25} />;
    }
  },
  {
    title: 'Custom min/max track tint color',
    render(): ReactElement {
      return (
        <SliderExample
          minimumTrackTintColor={'red'}
          maximumTrackTintColor={'green'}
        />
      );
    }
  },
  {
    title: 'Custom thumb image',
    render(): ReactElement {
      return <SliderExample thumbImage={require('../assets/SliderThumb01.png')} />;
    }
  }
  
];