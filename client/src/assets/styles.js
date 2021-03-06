// EACH STYLE SHEET represents the styles for that particular component
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var {StyleSheet} = React;
var signupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent',
  },
  mark: {
    width: 200,
    height: 275
  },
  signInHeader:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: .2,
    backgroundColor: 'transparent'
  },
  signInInputs: {
      marginTop: 50,
      marginBottom: 50,
  },
  topText:{
    marginTop: 40,
    fontSize: 20,
    // fontFamily: 'Palatino',
    // fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#FFF'
  },
  logoText: {
    fontSize: 100,
    fontFamily: 'Bradley Hand',//'Chalkduster', //'Bradley Hand',
    // fontStyle: 'italic',
    fontWeight: '900',
    color: '#000000'  //color for best bet
  },
  signin: {
    backgroundColor: '#3366CC', //theme color blue
    padding: 20,
    alignItems: 'center'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  traits: {
    borderColor: '#3986AC',
    // borderWidth: 2,
    backgroundColor: '#3366CC',
    borderColor: '#3986AC',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    flex: .14
  },
  pressed: {
    backgroundColor: '#36A156',
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: .15
  },
  inputPassword: {
    marginLeft: 15,
    width: 20,
    height: 21
  },
  inputUsername: {
    marginLeft: 15,
    width: 20,
    height: 20
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
  },
  input: {
    position: 'absolute',
    left: 61,
    top: 12,
    right: 0,
    height: 20,
    fontSize: 18
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 16,
  },
  error: {
    marginTop: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: 'red'
  }
});

var mapStyles = StyleSheet.create({
  restaurantName: {
    fontSize: 11,
    backgroundColor: 'rgba(91, 167, 200, 0.58)',
    color: 'black',
    textAlign: 'right',
    position: 'absolute'
  },
  goToUser: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginHorizontal: 10
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginTop: windowSize.height/20,
    position: 'absolute',
    top: 10,
    padding: 10,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 20,
    left: windowSize.width/150,
    top: windowSize.width/100,

    position: 'absolute'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(91, 167, 200, 0.58)',
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    borderColor: '#3986AC',
    borderWidth: 2,
    width: 50,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 2,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  otherButton: {
    backgroundColor: 'rgba(255, 207, 87, 0.58)',
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 20,
    width:86,
    borderColor: '#BFAC40',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    marginBottom: 30
    // backgroundColor: 'pink',
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 100
  },
  otherTraitContainer: {
    width: windowSize.width-50,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    backgroundColor: 'transparent',
  }

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


var userHW = 8;
var userDot = {
  0: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderColor: 'blue',
    borderWidth:1
  },
  1: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'lime',
    borderColor: 'blue',
    borderWidth:1,
  },
  2: {
    height:userHW,
    width:userHW,
    borderRadius: userHW/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth:1.5,
  }
};
var zoomedOutHW = 7;
var zoomedOut = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor: 'black'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(255, 0, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  // repeat
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(255, 0, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(209, 0, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(209, 0, 0)',
    borderWidth:1,
    borderColor: 'black'

  },
  5:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(245, 241, 0)',
    borderWidth:1,
    borderColor: 'black'

  },
  6:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(163, 245, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  7:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(34, 224, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  8:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(34, 224, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  9:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(34, 224, 0)',
    borderWidth:1,
    borderColor: 'black'
  },
  10:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:zoomedOutHW,
    width:zoomedOutHW,
    borderRadius: zoomedOutHW/2,
    backgroundColor: 'rgb(34, 224, 0)',
    borderWidth:1,
    borderColor: 'black'
  }
}

var histHW = 25;

var liveStyles = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor:'rgba(0, 0, 0, 0.3)'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',

  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(255, 0, 0, 0.5)',
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(209, 0, 0, 0.2)',

  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(245, 241, 0, 0.2)',

  },
  6:{
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(163, 245, 0, 0.3)',
  },
  7:{
   justifyContent: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    alignSelf:'center',
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.5)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.6)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:histHW,
    width:histHW,
    borderRadius: histHW/2,
    borderWidth:(histHW-userHW)/2,
    borderColor: 'rgba(34, 224, 0, 0.7)',
  }

};



var liveHW = 27;

var histStyles = {
  0:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor:'rgba(0, 0, 0, 1)'
  },
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(255, 0, 0, 1)',

  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(255, 0, 0, 1)',
  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(209, 0, 0, 1)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(209, 0, 0, 1)',

  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(245, 241, 0, 1)',

  },
  6:{
    justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(163, 245, 0, 1)',
  },
  7:{
   justifyContent: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    alignSelf:'center',
    borderColor: 'rgba(34, 224, 0, 1)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 1)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 1)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
    height:liveHW,
    width:liveHW,
    borderRadius: liveHW/2,
    borderWidth:(liveHW-histHW)/2,
    borderColor: 'rgba(34, 224, 0, 1)',
  }

};

var markerStyles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    justifyContent: 'center',
     height:18,
     width:18,
     borderRadius: 9,
    alignSelf: 'flex-start',
  },
  me: {
    height:12,
    width:12,
    borderRadius: 6,
    backgroundColor:'blue',
    borderColor: 'white',
    borderWidth:2,
  },
  voted: {
    height:12,
    width:12,
    borderRadius: 20,
    backgroundColor:'white',
    borderColor: 'black',
    borderWidth:1,
  },
   outline: {
    height:30,
    width:30,
    borderRadius: 15,
    backgroundColor:'blue',
    opacity:.3,
  },
  dot: {
    flex: 0,
    height:3,
    width:3,
    borderRadius: 1.5,
    backgroundColor:'black',
    paddingHorizontal: 0,
    paddingVertical: 0,
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
    width:100,
    height:100,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    opacity:.5,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 50,
  },
  stats:{
    alignSelf: 'flex-end'
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'black',
    alignSelf: 'center',
    marginTop: -9,
  }
});

var menuStyles = StyleSheet.create({
  nineButtons: {
    flexDirection: 'column',
    height: window.height,
    paddingLeft: window.width/100,
    paddingRight: window.width/100,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  menu: {
    flex: 1,
    backgroundColor: '#f3f5f4',
    padding: 10,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  avatar: {
    width: window.height/20,
    height: window.height/20,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  item: {
    fontSize: 14,
    paddingTop: 5,
  },
  button1: {
    height: windowSize.height/20,
    width: windowSize.width/3.5,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 2,
    borderRadius: 5,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  button2: {
    height: windowSize.height/16,
    width: windowSize.width/3.5,
    backgroundColor: '#09a5ff',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  buttonLogout: {
    height: windowSize.height/16,
    width: windowSize.width/3.5,
    backgroundColor: '#ff5050',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: windowSize.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row'
  }
});

var modalStyles = StyleSheet.create({
  ex: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20
  },
  briefModal: {
    flex: 2,
    flexDirection:'row',
    width:windowSize.width,
    // height:height/8 ,
    backgroundColor:'rgba(251, 251, 240, 0.58)', //left side of the box
    borderTopColor: '#E4DFAF',
    borderTopWidth: 3,
  },
  briefInfo: {
    flex:5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent:'flex-start',
    // alignSelf: 'flex-end',
    padding: 10,
    height: windowSize.height/8,
    // width: width - (height/8)-20,
    backgroundColor: 'rgba(251, 251, 240, 0.58)', //right side of the box rgba(251, 251, 240, 0.58)
    // borderTopColor: 'grey',
    // borderTopWidth: 3,
    // borderColor: 'rgba(34, 224, 0, 0.4)',
    // borderWidth: 1,

  },
  fullModal: {
    backgroundColor: '#fbfbf0',
    width:windowSize.width,
    height:windowSize.height,
  },
  info: {  //all vote score summary
    // padding: 5,
    backgroundColor:'transparent',
    borderColor: 'transparent',  //
    borderWidth: 5
  },
  briefImage: {
    marginTop: -25,
    borderWidth: 3,
    borderColor: '#E4DFAF',
    // paddingLeft: 30,
    marginLeft: 30,
    borderRadius: 50,
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    height: 100,
    width: 100,
  },
  fullImage: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    width:windowSize.width,
    height: windowSize.height/3
  },
  fullName: {  //top box
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor:'transparent',
    borderColor: 'transparent',
    borderWidth: 5
  },
  myVotes: {   //votes on previous visit //middle box
    paddingLeft: 10,
    backgroundColor:'transparent',
    borderColor: 'transparent',
    borderWidth: 5
  },
  voteScreen: {
    // backgroundColor: 'grey',
  },
  voteButton: {
    width: windowSize.width-windowSize.width/6,
    height: windowSize.height/10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 50,
    margin: windowSize.width/80,
    justifyContent: 'center',
  },
  voteHeader: {  //voteview top question area
    flex:2,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
    // height: height/8,
    width: windowSize.width - (windowSize.height/8)-20,
    backgroundColor: 'transparent',
    // borderColor: 'rgba(34, 224, 0, 0.4)',
    // borderWidth: 5
  },
  voteSectionHeader: {
    padding: 10,
    paddingLeft: 25,
    fontWeight:'bold',
    backgroundColor: 'transparent',
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#0F172E', //color for your preferences
    alignItems: 'center'
  },
  voteHeaderText: {
    textAlign: 'center'
  },
  submitVote: {
    height: 30,
    width: 384,
    padding: 15,
    // height: height/10,
    backgroundColor: '#3366CC', //universalblue
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#3986AC',
    borderWidth: 3,
    borderRadius: 20,
    margin: windowSize.width/80,
    justifyContent: 'center',
  },
  subText: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold',
  }
});

var scoreWidth = windowSize.width/35;

var scoreStyles = StyleSheet.create({
  0:{},
  1:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 0, 0)',
  },
  2:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(209, 0, 0)'

  },
  3:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 51, 51)',
  },
  4:{
    alignSelf: 'center',
    justifyContent: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 92, 92)',

  },
  5:{
    justifyContent: 'center',
    alignSelf: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(245, 241, 0)',

  },
  6:{
    justifyContent: 'center',
    alignSelf: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(163, 245, 0)',
  },
  7:{
   justifyContent: 'center',
   alignSelf: 'center',
   height:scoreWidth,
   width:scoreWidth,
   borderRadius: scoreWidth/2,
   borderColor: 'black',
   borderWidth: 1,
    backgroundColor: 'rgb(34, 224, 0)',
  },
  8:{
    justifyContent: 'center',
    alignSelf: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(34, 224, 0)',
  },
  9:{
    justifyContent: 'center',
    alignSelf: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(34, 224, 0)',
  },
  10:{
    justifyContent: 'center',
    alignSelf: 'center',
    height:scoreWidth,
    width:scoreWidth,
    borderRadius: scoreWidth/2,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(34, 224, 0)'
  }

});
module.exports = {
  appStyles: appStyles,
  histStyles: histStyles,
  mapStyles: mapStyles,
  markerStyles: markerStyles,
  signupStyles: signupStyles,
  calloutStyles: calloutStyles,
  menuStyles: menuStyles,
  liveStyles: liveStyles,
  userDot: userDot,
  zoomedOut: zoomedOut,
  scoreStyles: scoreStyles,
  modalStyles: modalStyles

};
