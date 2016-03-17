var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var DisplayLatLng = require('./src/components/map.js');
var Signup = require('./src/components/signup.js');

var styles = require('./src/assets/styles.js').appStyles;
//var Login = require('./src/component/login.js');
var App = React.createClass({

  getInitialState: function() {
        return {
            componentSelected: 'Intro'
        }
    },

  changeComponent: function(component) {
    this.setState({
        componentSelected: component    
    })
  },

  renderComponent: function(component) {
        if(component == 'Intro') {
        return <ComponentIntro changeComponent={this.changeComponent} />
      } else if(component == 'Signup') {
        return <ComponentSignup changeComponent={this.changeComponent} />
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

var ComponentIntro = React.createClass({
    render: function() {
    return (
        <View style={{backgroundColor: '#cceeff', paddingTop:100, flex:1}}>
        <Text style={{color: '#0066ff', marginBottom:200, textAlign: 'center', fontSize:20}}>welcome to our app</Text>
        <TouchableHighlight onPress={() => this.props.changeComponent('Signup') } style={styles.buttonIntro}><Text>Signup</Text></TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.changeComponent('map') } style={styles.buttonIntro}><Text>login (redirect to map for now)</Text></TouchableHighlight>
      </View>
    )
  }
})

var ComponentSignup = React.createClass({
    render: function() {
    return (
      <View style={{flex: 1}}>
      {<Signup />}
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

module.exports = App;
