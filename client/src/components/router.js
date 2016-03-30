import React, {
  Component,
  Navigator
} from 'react-native';
import styles from '../assets/styles.js';

import Login from '../containers/container_login';
import Signup from '../containers/container_signup';
import Map from '../containers/container_map';

const ROUTES = { Login, Signup, Map };

export default class Router extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.basicContainer}
        initialRoute={{name: 'Login'}}
        renderScene={this.renderScene}
        configureScene = { () => Navigator.SceneConfigs.FloatFromBottom }
      />
    );
  }
}