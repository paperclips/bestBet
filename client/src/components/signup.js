'use strict';
var React = require('react-native');
var t = require('tcomb-form-native');
var { 
  AppRegistry, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  ListView,
  StyleSheet
} = React;
var Form = t.form.Form;
var styles = require('../assets/styles.js').signupStyles;
var User   = t.struct({
  name: t.String,              // a required string
  //email: t.maybe(t.String),    // an optional string
  password: t.String
  //age: t.Number,               // a required number
  //rememberMe: t.Boolean        // a boolean
});

console.log('signuppage!!');
var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

var THUMB_URLS = [
'http://iconizer.net/files/Kids/orig/thumbnail.png', 
'https://upload.wikimedia.org/wikipedia/commons/c/c4/Broccoli-thumbnail.png', 
'http://data.unhcr.org/wiki/images/f/fd/Link.png', 
'http://vignette2.wikia.nocookie.net/town-of-salem/images/7/75/Mafioso_icon.png/revision/latest?cb=20150801165425', 
'https://www.enriquedans.com/wp-content/uploads/2013/10/dead-battery.jpg', 
'http://vignette4.wikia.nocookie.net/finalfantasy/images/2/2f/Cactuar-ccvii-dmw.png/revision/latest?cb=20140726083859', 
'http://vignette2.wikia.nocookie.net/cybernations/images/7/73/Trollface.png/revision/latest?cb=20110201043740', 
'http://vignette2.wikia.nocookie.net/nintendo/images/2/2e/Mario_SSB4_Alt.png/revision/latest?cb=20130615005530&path-prefix=en', 
'http://www.gokart.co.uk/wp-content/uploads/2008/05/funny-face06.thumbnail.jpg', 
'https://s-media-cache-ak0.pinimg.com/236x/75/b5/f4/75b5f40a2d4319f1f9a8fe8655108106.jpg', 
'http://funnyasduck.net/wp-content/uploads/2012/09/Funny-Wild-Nicki-Minaj-Pokemon.jpg', 
'https://s-media-cache-ak0.pinimg.com/736x/62/ca/be/62cabed126de0002dfb60220684725b9.jpg'];

var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var Signup = React.createClass({
  getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(this._genRows({})),
      };
    },

    _pressData: ({}: {[key: number]: boolean}),

    componentWillMount: function() {
      this._pressData = {};
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
      var rowHash = Math.abs(hashCode(rowData));
      var imgSource = {
        uri: THUMB_URLS[rowHash % THUMB_URLS.length],
      };
      return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor='rgba(0,0,0,0)'>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={imgSource} />
              <Text style={styles.text}>
                {rowData}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    },

    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
      var dataBlob = [];
      for (var ii = 0; ii < 9; ii++) {
        var pressedText = pressData[ii] ? ' (X)' : '';
        dataBlob.push('Cell ' + ii + pressedText);
      }
      return dataBlob;
    },

    _pressRow: function(rowID: number) {
      this._pressData[rowID] = !this._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData)
      )});
    },

  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Signup;