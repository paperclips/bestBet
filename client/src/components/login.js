'use strict';
var React = require('react-native');
var t = require('tcomb-form-native');
var { 
  AppRegistry, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  StyleSheet
} = React;

var DisplayLatLng = require('./map.js');
var Intro = require('./intro.js');
var App = require('../../App.js');
var Form = t.form.Form;
var styles = require('../assets/styles.js').signupStyles;
var User   = t.struct({
  name: t.String,
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

var Login = React.createClass({
  getInitialState: function() {
    return {
      componentSelected: 'Login'
    }
  },

  changeComponent: function(component) {
    this.setState({
      componentSelected: component    
    })
  },

  renderComponent: function(component) {
    if(component == 'Login') {
      return <ComponentLogin changeComponent={this.changeComponent} />
    } else if(component == 'Intro') {
      return <ComponentIntro changeComponent={this.changeComponent} />
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

var ComponentLogin = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
        />
      <TouchableHighlight style={styles.button} onPress={() => this.props.changeComponent('Intro') } underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button} onPress={() => this.props.changeComponent('map') } underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>login</Text>
      </TouchableHighlight>

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

//both button goes to map view for now
var ComponentIntro = React.createClass({
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
        {<Intro />}
        </View>
    )
  }
})

module.exports = Login;