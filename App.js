import { createStore } from 'redux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Nav from './components/Nav';
import Reducer from './components/Redux/Reducer';

const store = createStore(Reducer);


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Nav />
        </Provider>
    );
  }
}

export default App;
