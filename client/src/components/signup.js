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
    this.state = { name: '', userName: '', password: '', traitCombo: null, buttonPress: [0,0,0,0,0,0,0,0,0]};
    this.traitCombo = [];
    this.error = '';
  }

  onPress(){

    var value = this.refs.form.getValue();
    if(value){
      if(value.password !== value.comparePassword){
        this.error = "Passwords don't match";
      } else if(this.traitCombo.length === 0){
        this.error = "Please set your preferences"
      } else {
        this.error = '';
        this.setState({name: value.name, userName: value.userName, password: value.password, traitCombo: this.traitCombo});
        this.props.signupUser(this.state, this.props.navigator);
      }
    }
  }

  traitsClicked (traitChoice) {
    var index = this.traitCombo.indexOf(traitChoice);
    if(index > -1){
      this.traitCombo.splice(index,1)
      var choices = this.state.buttonPress;
      choices[traitChoice-1] = false;
      this.setState({buttonPress: choices});
      console.log(this.state.buttonPress, 'FLIPPPP');
    } else if(this.traitCombo.length < 3){
      this.traitCombo.push(traitChoice);
      var choices = this.state.buttonPress;
      choices[traitChoice-1] = true;
      this.setState({buttonPress: choices});
    }
    console.log(this.traitCombo, '<<ARRAY OF USER CHOSEN TRAITS %+$$');
  }

  render() {
    return (
      <View style={styles.container}>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[0] && styles.button2]} onPress={this.traitsClicked.bind(this, 1)} underlayColor={'black'} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn}>
        <Text style={styles.buttonText}>Good Food</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[1] && styles.button2]} onPress={this.traitsClicked.bind(this, 2)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Drinks</Text>
      </TouchableHighlight>        

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[2] && styles.button2]} onPress={this.traitsClicked.bind(this, 3)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Deal</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[3] && styles.button2]} onPress={this.traitsClicked.bind(this, 4)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Noisy</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[4] && styles.button2]} onPress={this.traitsClicked.bind(this, 5)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Crowded</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[5] && styles.button2]} onPress={this.traitsClicked.bind(this, 6)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>No Wait</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[6] && styles.button2]} onPress={this.traitsClicked.bind(this, 7)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Service</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[7] && styles.button2]} onPress={this.traitsClicked.bind(this, 8)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Upscale</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={[styles.button1, this.state.buttonPress[8] && styles.button2]} onPress={this.traitsClicked.bind(this, 9)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Veggie Friendly</Text>
      </TouchableHighlight> 
        <Form
          ref="form"
          type={User}
          options={options}
        />
      <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>login</Text>
      </TouchableHighlight>
      </View>
    )
  }
};