import React, { AppRegistry, Component } from 'react-native';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

//import * as reducers from '../reducers';
import Intro from './src/components/intro.js';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);

export default class client extends Component {
  render() {
    return( 
      <Intro />
//>>>>>>> changed file structure
    )
  }  
}

