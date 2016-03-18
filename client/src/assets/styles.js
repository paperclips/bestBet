// EACH STYLE SHEET represents the styles for that particular component
var React = require('react-native');
var {StyleSheet} = React;
var signupStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
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
 buttonIntro: {
  padding:10, 
  height:45, 
  overflow:'hidden', 
  borderRadius:4,
  margin: 10,
  backgroundColor: 'white'
 },
 back: {
   position: 'absolute',
   top: 20,
   left: 12,
   backgroundColor: 'rgba(255,255,255,0.6)',
   padding: 12,
   borderRadius: 20,
   width: 80,
   alignItems: 'center',
   justifyContent: 'center',
 },
});

var markerStyles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    justifyContent: 'center',
     height:18,
     width:18,
     borderRadius: 9,
    alignSelf: 'flex-start',
  },
  dot: {
    flex: 0,
    height:3,
    width:3,
    borderRadius: 1.5,
    backgroundColor:'black',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  score: {
    backgroundColor: 'red',
    height:24,
    width:24,
    opacity:.3,
    borderRadius: 12
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
    marginTop: 0,
  },
});

var calloutStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'auto',
    top: 48,
    backgroundColor: 'black',
    opacity:.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 30,
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  }



});

module.exports = {
  appStyles: appStyles,
  mapStyles: mapStyles,
  markerStyles: markerStyles,
  signupStyles: signupStyles,
  calloutStyles, calloutStyles
};
