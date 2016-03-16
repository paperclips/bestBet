// EACH STYLE SHEET represents the styles for that particular component
var React = require('react-native');
var {StyleSheet} = React;

var mapStyles = StyleSheet.create({
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

var appStyles = StyleSheet.create({
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

var markerStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    height:12,
    width:12,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 3.5,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'black',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = {
  appStyles: appStyles,
  mapStyles: mapStyles,
  markerStyles: markerStyles
};
