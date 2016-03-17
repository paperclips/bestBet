// info callout

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

var infoCallout = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
         <View style={styles.arrow} />

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 120,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'pink',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 6,
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'pink',
    alignSelf: 'center',
    marginTop: 6,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: 0.5,
  },
});

module.exports = infoCallout;
