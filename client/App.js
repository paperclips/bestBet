import React, { AppRegistry, Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/rootReducer';
// import Intro from './src/components/intro.js';
import Router from './src/components/router';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);

export default class client extends Component {
  render() {
    return ( 
      <Provider store = {store}>
        <Router />
      </Provider>  
    );
  }  
}

