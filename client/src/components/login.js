'use strict';
var React = require('react-native');
var t = require('tcomb-form-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const SideMenu = require('./sideMenu');
const Menu = require('./menu');  

var { 
  AppRegistry,
  Component, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  TouchableOpacity,
  StyleSheet
} = React;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value


const menuStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



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










class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}





export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '', isOpen: false, selectedItem: 'About', };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  onLogin(){
    var value = this.refs.form.getValue();
    if(value){
      this.setState({userName: value.userName, password: value.password});
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
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>


      <View style={{height: windowSize.height, backgroundColor: '#f7f6f3'}}>

      <View style={styles.container}>
        <View style={styles.topSpace}>
        </View>

        <Button style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: windowSize.height/20, height: windowSize.height/20, }} />
        </Button>



        <Form
          ref="form"
          type={User}
          options={options}
        />
        <View style={styles.twoButtons}>
        <TouchableHighlight style={styles.button1} onPress={this.onLogin.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button1} onPress={this.onSignup.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.error}>{this.onError.call(this)}</Text>
      </View>  
      </View>

      </SideMenu>
    )
  }
};