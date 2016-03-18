import React, { AppRegistry, Component } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';

// import rootReducer from './src/components/reducers';
// import Router from './src/components/router';

import App from './App.js';

// create a store that has redux-thunk middleware enabled
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// init store with rootReducer
// const store = createStoreWithMiddleware(rootReducer);

// console.log(store.getState().toJS());

class client extends Component {
  render() {
    // return(
    //   <Provider store={store}>
    //     { () => <App /> }
    //   </Provider>
    // )
    return <App />
  }
}

// export default store;
AppRegistry.registerComponent('client', () => client);
