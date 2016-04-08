import React, { AppRegistry, Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/rootReducer';
import Router from './src/components/router';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(rootReducer);

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

export default class client extends Component {
  render() {
    return ( 
      <Provider store = {store}>
        <Router />
      </Provider>  
    );
  }  
}

