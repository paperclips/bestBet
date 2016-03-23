import React, { AppRegistry, Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/rootReducer';
import Router from './src/components/router';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

// function printStore () {
//   console.log("STORRRRRRE :",store.getState());
// };

// setTimeout(printStore, 15000);

export default class client extends Component {
  render() {
    return ( 
      <Provider store = {store}>
        <Router />
      </Provider>  
    );
  }  
}

