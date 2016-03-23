import React, {
  Component,
  Navigator
} from 'react-native';
import styles from '../assets/styles.js';

import Login from '../containers/container_login';
import Signup from '../containers/container_signup';
// import Traits from '../containers/container_trait';
// import Vote from '../containers/container_vote';
import Map from '../containers/container_map';
// import Menu from '../containers/container_menu';

const ROUTES = { Login, Map };

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
        configureScene = { () => Navigator.SceneConfigs.FloatFromRight }
      />
    );
  }
}