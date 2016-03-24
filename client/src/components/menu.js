const React = require('react-native');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  TouchableHighlight,
} = React;

const window = Dimensions.get('window');
const styles = require('../assets/styles.js').menuStyles2;

module.exports = class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {buttonPress: [0,0,0,0,0,0,0,0,0]};
    this.traitCombo = [];
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

  resetTraits() {
    // var comboInteger = 1 * this.traitCombo.join('');
    // this.setState({traitCombo: this.traitCombo}); // ['2', '5', '9']
    console.log(this.traitCombo,'<-newcomboInteger');
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

          // <Image
          //   style={styles.avatar}
          //   source={{ uri, }}/>

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Text>New Preferences</Text>
        </View>

        <View style={styles.nineButtons}>

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

        <TouchableHighlight style={styles.button1} onPress={this.resetTraits.bind(this)}underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableHighlight> 
        </View>
        <View>
        <Text
          onPress={() => this.props.onItemSelected('logout')}
          style={styles.item}>
          logout
        </Text>
        </View>
        </View>
      </ScrollView>
    );
  }
};
