import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { firebase } from '../config';

// const { currentUser } = firebase.auth();
// firebase.database().ref(`/users/${currentUser.uid}/plants`)

class AddPlant extends Component {
  render() {
    return (
      <View>
        <Button
          title='Open'
          onPress={ () => this.props.navigation.openDrawer() }
        />
        <Text>Add New Plant</Text>
      </View>
    );
  }
}

export default AddPlant;