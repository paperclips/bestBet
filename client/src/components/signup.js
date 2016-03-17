var React = require('react-native');
var t = require('tcomb-form-native');
var { AppRegistry, StyleSheet, Text, View, TouchableHighlight } = React;
var Form = t.form.Form;
var styles = require('../assets/styles.js').signupStyles;
var User   = t.struct({
  name: t.String,              // a required string
  email: t.maybe(t.String),    // an optional string
  password: t.String,
  //age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

var Signup = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Signup;