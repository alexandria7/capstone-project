import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from './src/config';
import AppContainer from './navigation/AppNavigator';

// componentDidMount() {
  firebase.initializeApp(firebaseConfig);
// }
class App extends Component {

  render() {
    return <AppContainer />;
  }
}

export default App;

