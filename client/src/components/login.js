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
  userName: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '' };
    this.allTraits = 
      {
      "1" : false,
      "2" : false,
      "3" : false,
      "4" : false,
      "5" : false,
      "6" : false,
      "7" : false,
      "8" : false,
      "9" : false
    };
    
    // this.t.trait1 = false;
    // this.t.trait1.value = 1;

    // this.t.trait2 = false;
    // this.t.trait2.value = 2;

    // this.t.trait3 = false;
    // this.t.trait3.value = 3;

    // this.t.trait4 = false;
    // this.t.trait4.value = 4;

    // this.t.trait5 = false;
    // this.t.trait5.value = 5;

    // this.t.trait6 = false;
    // this.t.trait6.value = 6;

    // this.t.trait7 = false;
    // this.t.trait7.value = 7;

    // this.t.trait8 = false;
    // this.t.trait8.value = 8;

    // this.t.trait9 = false;
    // this.t.trait9.value = 9;

  }

  onPress(){
    var value = this.refs.form.getValue();
    if(value){
      this.setState({userName: value.userName, password: value.password});
      this.props.loginUser(this.state, this.props.navigator) 
    }
  }

  traitsClicked (traitChoice, number) {
    console.log(number, "should be one two three or four..");
    var finalChoice = [];
    this.allTraits[number] = !this.allTraits[number];
    if(this.allTraits[number]){

    }
    console.log(this.allTraits, 'list of traits in T/F');
    for(var key in this.allTraits){
      if(this.allTraits[key]){
        finalChoice.push(key);
      }
    }

    if(finalChoice.length === 3){
      console.log('USER GOT ALL THREE TRAITS CHOICES!')
    } else if (finalChoice.length > 3){
      console.log('too many traits, only pick three');
    } else {
      console.log('pick more traits!');
    }
    console.log(finalChoice, 'should be 1 - 3 numbers array');
  }

// var traitNames = ['Good Food', 'Good Drinks', 'Good Deal', 'Not Noisy', 'Not Crowded', 'No Wait','Good Service','Upscale', 'Veggie Friendly'];


  render() {
    return (
      <View style={styles.container}>

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "one", 1)} underlayColor={'black'} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn}>
        <Text style={styles.buttonText}>Good Food</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "two", 2)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Drinks</Text>
      </TouchableHighlight>        

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "three", 3)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Deal</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "four", 4)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Noisy</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "five", 5)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Not Crowded</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "six", 6)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>No Wait</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "seven", 7)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Good Service</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "eight", 8)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Upscale</Text>
      </TouchableHighlight> 

      <TouchableHighlight style={styles.button1} onPress={this.traitsClicked.bind(this, "nine", 9)} underlayColor='#99d9f4'>
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


// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { userName: '', password: '' };
//   }
  
//   onPress(){
//     this.props.loginUser(this.getState(), this.props.navigator) 
//   }

//   render() {
//     return (
//       <View>
//       <TextInput 
//         value={this.state.userName}
//         onChangeText={ userName => this.setState({ userName }) }
//         placeholderTextColor="white"
//         placeholder="userName" 
//       />
      
//       <TextInput 
//         value={this.state.password}
//         secureTextEntry={true}
//         onChangeText={ password => this.setState({ password }) }  
//         placeholderTextColor="white"
//         placeholder="password"
//       />

//       <Button text="Login" clickAction={this.onPress.bind(this)} />
//       </View>
//     );  
//   }
// }
