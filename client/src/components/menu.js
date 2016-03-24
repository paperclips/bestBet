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
const uri = 'http://cf.ltkcdn.net/socialnetworking/images/std/168646-425x425-Cat-Avatar-Primary.jpg';

const styles = StyleSheet.create({
  nineButtons: {
    flexDirection: 'column',
    height: window.height, 
    paddingLeft: window.width/100,
    paddingRight: window.width/100,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  menu: {
    flex: 1,
    // width: window.width,
    // height: window.height,
    backgroundColor: '#f3f5f4',
    padding: 10,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  avatar: {
    width: window.height/20,
    height: window.height/20,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  item: {
    fontSize: 14,
    // fontWeight: '300',
    paddingTop: 5,
  },
  button1: {
    height: window.height/20,
    width: window.width/3.5,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 2,
    borderRadius: 5,
    margin: window.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  button2: {
    height: window.height/16,
    width: window.width/3.5,
    backgroundColor: '#09a5ff',
    borderColor: '#007dc1',
    borderWidth: 2,
    borderRadius: 10,
    margin: window.width/80,
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row'
  }
});

module.exports = class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = { name: '', userName: '', password: '', traitCombo: null, buttonPress: [0,0,0,0,0,0,0,0,0], error: ''};
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


        <TouchableHighlight style={styles.button1} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableHighlight> 
        </View>
        <View>
        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          cancel
        </Text>
        </View>
        </View>



      </ScrollView>
    );
  }
};
