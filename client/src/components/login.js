'use strict';
import React, { Component } from 'react-native';
import background from '../assets/background1.jpg';
import logo from '../assets/directions-icon.png';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var styles = require('../assets/styles.js').signupStyles;

var {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {userName: '', password: ''};
  }

  onLogin(){
    if(this.state.userName && this.state.password){
      this.props.authUser(this.state, this.props.navigator, '/login');
    }
  }

  onSignup(){
    this.props.clearError();
    this.props.navigator.push({ name: 'Signup' });
  }

  onError(){
    return this.props.user.error;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={background} resizeMode='cover' />
        <View style={styles.header}>
          <Image style={styles.mark} source={logo} />
          <Text style={styles.logoText}>Best Bet</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Username"
              placeholderTextColor="#FFF"
              onChangeText={(userName) => this.setState({userName})}
              value={this.state.userName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
            <TextInput
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Password"
              placeholderTextColor="#FFF"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <Text style={styles.error}>{this.onError.call(this)}</Text>
        </View>
        <TouchableHighlight style={styles.signin} onPress={this.onLogin.bind(this)}>
          <Text style={styles.whiteFont}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.signup} onPress={this.onSignup.bind(this)}>
          <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
        </TouchableHighlight>
      </View>
    );
  };
};