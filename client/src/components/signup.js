'use strict';
var React = require('react-native');
var t = require('tcomb-form-native');
var { 
  AppRegistry,
  Component, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  StyleSheet
} = React;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value


var Form = t.form.Form;
var styles = require('../assets/styles.js').signupStyles;
var User   = t.struct({
  name: t.String,
  userName: t.String,
  password: t.String,
  comparePassword: t.String
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    comparePassword: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', userName: '', password: '', traitCombo: null, buttonPress: [0,0,0,0,0,0,0,0,0], error: ''};
    this.traitCombo = [];
  }

  onPress(){
    var value = this.refs.form.getValue();
    if(value){
      if(value.password !== value.comparePassword){
        this.setState({error: "Passwords don't match"});
      } else if(this.traitCombo.length === 0){
        this.setState({error: "Please set your preferences"});
      } else {
        this.setState({error: ""});
        var comboInteger = 1 * this.traitCombo.join('');
        this.setState({name: value.name, userName: value.userName, password: value.password, traitCombo: comboInteger});
        this.props.authUser(this.state, this.props.navigator, '/signup');
      }
    }
  }

  backToSignin(){
    this.props.navigator.pop();
  }

  traitsClicked (traitChoice) {
    var index = this.traitCombo.indexOf(traitChoice);
    var choices = this.state.buttonPress;
    if(index > -1){
      this.traitCombo.splice(index,1)
      choices[traitChoice-1] = false;
    } else if(this.traitCombo.length < 3){
      this.traitCombo.push(traitChoice);
      choices[traitChoice-1] = true;
    }
    this.setState({buttonPress: choices});
  }

  onError(){
    return this.props.user.error || this.state.error;
  }

  render() {
    return (
      <View style={{backgroundColor: '#f7f6f3'}}>
      <View style={styles.topSpace}>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableHighlight style={[styles.button1, this.state.buttonPress[0] && styles.button2]} onPress={this.traitsClicked.bind(this, 1)} underlayColor={'black'} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn}>
        <Text style={styles.buttonText}>Good Food</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[1] && styles.button2]} onPress={this.traitsClicked.bind(this, 2)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Drinks</Text>
      </TouchableHighlight>        

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[2] && styles.button2]} onPress={this.traitsClicked.bind(this, 3)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Deal</Text>
      </TouchableHighlight>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableHighlight style={[styles.button1, this.state.buttonPress[3] && styles.button2]} onPress={this.traitsClicked.bind(this, 4)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Noisy</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[4] && styles.button2]} onPress={this.traitsClicked.bind(this, 5)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Crowded</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[5] && styles.button2]} onPress={this.traitsClicked.bind(this, 6)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>No Wait</Text>
      </TouchableHighlight> 
      </View>

      <View style={styles.buttonContainer}>
      <TouchableHighlight style={[styles.button1, this.state.buttonPress[6] && styles.button2]} onPress={this.traitsClicked.bind(this, 7)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Service</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[7] && styles.button2]} onPress={this.traitsClicked.bind(this, 8)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Upscale</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[8] && styles.button2]} onPress={this.traitsClicked.bind(this, 9)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Veggie Friendly</Text>
      </TouchableHighlight> 
      </View>

      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
        />
      </View> 

      <View style={styles.twoButtons}>
      <TouchableHighlight style={styles.button1} onPress={this.backToSignin.bind(this)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button1} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableHighlight>
      </View>
      <Text style={styles.error}>{this.onError.call(this)}</Text>
      </View>
    )
  }
};