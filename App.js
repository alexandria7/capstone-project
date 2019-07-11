import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from './src/config';
import AppContainer from './navigation/AppContainer';

firebase.initializeApp(firebaseConfig);

class App extends Component {

  // componentDidMount() {
  //   firebase.initializeApp(firebaseConfig);
  //   }

  render() {
    return <AppContainer />;
  }
}

export default App;

