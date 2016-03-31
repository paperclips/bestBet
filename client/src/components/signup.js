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
    this.state = {name: '', userName: '', password: '', confirmPassword: '', traitCombo: null, buttonPress: [0,0,0,0,0,0,0,0,0], error: ''};
    this.traitCombo = [];
  }

  onPress(){
    if(!this.state.name){
      this.setState({error: "Please enter your name"});
    } else if(!this.state.userName){
      this.setState({error: "Please pick a username"});
    } else if(!this.state.password){
      this.setState({error: "Please pick a password"});
    } else if(this.state.password !== this.state.confirmPassword){
      this.setState({error: "Passwords don't match"});
    } else if(this.traitCombo.length === 0){
      this.setState({error: "Please set your preferences"});
    } else {
      this.setState({error: ''});
      var comboInteger = 1 * this.traitCombo.join('');
      this.setState({traitCombo: comboInteger});
      this.props.authUser(this.state, this.props.navigator, '/signup');
    }
  }

  traitsClicked (traitChoice) {
    var index = this.traitCombo.indexOf(traitChoice);
    var choices = this.state.buttonPress;
    if(index > -1){
      this.traitCombo.splice(index,1)
      choices[traitChoice] = false;
    } else if(this.traitCombo.length < 3){
      this.traitCombo.push(traitChoice);
      choices[traitChoice] = true;
    }
    this.setState({buttonPress: choices});
  }

  backToSignin(){
    this.props.clearError();
    this.props.navigator.pop();
  }

  onError(){
    return this.props.user.error || this.state.error;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={background} resizeMode='cover' />
        <Text style={styles.topText}> Pick your preferences</Text>
        <View style={styles.signInHeader}>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[0] && styles.pressed]} onPress={this.traitsClicked.bind(this, 0)}>
            <Text style={styles.whiteFont}>Good Food</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[1] && styles.pressed]} onPress={this.traitsClicked.bind(this, 1)}>
            <Text style={styles.whiteFont}>Good Drinks</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[2] && styles.pressed]} onPress={this.traitsClicked.bind(this, 2)}>
            <Text style={styles.whiteFont}>Good Deal</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signInHeader}>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[3] && styles.pressed]} onPress={this.traitsClicked.bind(this, 3)}>
            <Text style={styles.whiteFont}>Not Noisy</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[4] && styles.pressed]} onPress={this.traitsClicked.bind(this, 4)}>
            <Text style={styles.whiteFont}>Not Crowded</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[5] && styles.pressed]} onPress={this.traitsClicked.bind(this, 5)}>
            <Text style={styles.whiteFont}>No Wait</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signInHeader}>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[6] && styles.pressed]} onPress={this.traitsClicked.bind(this, 6)}>
            <Text style={styles.whiteFont}>Good Service</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[7] && styles.pressed]} onPress={this.traitsClicked.bind(this, 7)}>
            <Text style={styles.whiteFont}>Upscale</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.traits, this.state.buttonPress[8] && styles.pressed]} onPress={this.traitsClicked.bind(this, 8)}>
            <Text style={styles.whiteFont}>Veggie Friendly</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signInInputs}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Name"
              placeholderTextColor="#FFF"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
          </View>
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
          <View style={styles.inputContainer}>
            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
            <TextInput
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Confirm password"
              placeholderTextColor="#FFF"
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              value={this.state.confirmPassword}
            />
          </View>
          <Text style={styles.error}>{this.onError.call(this)}</Text>          
        </View>
        <TouchableHighlight style={styles.signin} onPress={this.onPress.bind(this)}>
          <Text style={styles.whiteFont}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.signup} onPress={this.backToSignin.bind(this)}>
          <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}>  Sign In</Text></Text>
        </TouchableHighlight>
      </View>
    );
  };
};