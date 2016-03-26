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
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity
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

var {
  height: deviceHeight
} = Dimensions.get('window');

var TopModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight* 0.5) }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  render: function() {
    return (
        <Animated.View style={[modalstyles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={{color: 'green'}}>Close Menu</Text>
          </TouchableOpacity>
        </Animated.View>
    )
  }
});

var App = React.createClass({
    render: function() {
      return (
        <View style={modalstyles.flexCenter}>
          <TouchableOpacity onPress={this.props.openModal}>
            <Text>Open Modal</Text>  
          </TouchableOpacity>
        </View>
      )
    }
});

var RouteStack = {
  app: {
    component: App 
  }
}

var modalstyles = StyleSheet.create({
  container: {
    flex: 5
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '', modal: false  };
  }

  showModal() {
    console.log('triggered');
    this.setState({modal: true});
    console.log(this.state.modal);
  }

  goToOtherRoute() {
    //this.refs.navigator.push({newRoute})
  }

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
    return (

      <View style={styles.container}>
        <View style={styles.topSpace}>
      </View>

        <Form
          ref="form"
          type={User}
          options={options}
        />
        <View style={styles.twoButtons}>
        <TouchableHighlight style={styles.button1} onPress={this.showModal.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>drawer</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button1} onPress={this.onLogin.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button1} onPress={this.onSignup.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        </View>

        <Text style={styles.error}>{this.onError.call(this)}</Text>

        <Text>123</Text>
        <View style={modalstyles.container}>
        {this.state.modal ? <TopModal goToOtherRoute={this.goToOtherRoute} closeModal={() => this.setState({modal: false}) }/> : null }
        </View>
      </View>
      )
  }
};