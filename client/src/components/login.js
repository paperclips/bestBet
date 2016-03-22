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
  }

  onPress(){
    var value = this.refs.form.getValue();
    if(value){
      this.setState({userName: value.userName, password: value.password});
      this.props.loginUser(this.state, this.props.navigator) 
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
