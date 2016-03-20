var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} = React;
var DisplayLatLng = require('./map.js');
var Signup = require('./signup.js');
var styles = require('../assets/styles.js').appStyles;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value
var io = require('socket.io-client/socket.io');

const SERVER_ROOT = 'http://localhost:3000';
var socket = io.connect(SERVER_ROOT, { jsonp: false });

// Emit an event to server
socket.on('connect',function(){
  //To receive establishment data, uncomment this line
  socket.emit('Get establishments',{zones: [6004]});  
});

socket.on('newData',function(newData){
  //New establishment and votes data
  // console.log('GOT NEW DATA', newData);
})

var Intro = React.createClass({

  getInitialState: function() {
        return {
            componentSelected: 'Intro'
        }
    },

  changeComponent: function(component) {
    this.setState({
        componentSelected: component    
    })
  },

  renderComponent: function(component) {
        if(component == 'Intro') {
        return <ComponentIntro changeComponent={this.changeComponent} />
      } else if(component == 'Signup') {
        return <ComponentSignup changeComponent={this.changeComponent} />
      } else if(component == 'map') {
        return <ComponentMap changeComponent={this.changeComponent} />
      }
  },

  render: function() {
    return (
      <View style={{flex: 1}}>
        {this.renderComponent(this.state.componentSelected)}
      </View>
    );
  }
});

var ComponentIntro = React.createClass({
    render: function() {
    return (
        <View style={{backgroundColor: '#cceeff', paddingTop:100, flex:1}}>
        <Text style={{color: '#0066ff', marginBottom:200, textAlign: 'center', fontSize:20}}>welcome to our app</Text>
        <TouchableHighlight onPress={() => this.props.changeComponent('Signup') } style={styles.buttonIntro}><Text>Signup</Text></TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.changeComponent('map') } style={styles.buttonIntro}><Text>login (redirect to map for now)</Text></TouchableHighlight>
      </View>
    )
  }
})

var ComponentSignup = React.createClass({
    render: function() {
    // return (
    //   <NavigatorIOS
    //       style={{flex: 0.3}}
    //       initialRoute={{
    //           title: 'Signup Page',
    //           component: Signup,
    //       }}
    //   />
    // )
    return (
        <View style={{flex: 1}}>
        {<Signup />}
        </View>
    )
  }
})

var ComponentMap = React.createClass({
    render: function() {
    return (
        <View style={{flex: 1}}>
        {<DisplayLatLng />}
        </View>
    )
  }
})

module.exports = Intro;