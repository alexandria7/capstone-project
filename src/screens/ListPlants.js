import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListPlants extends Component {
  render() {
    return (
      <View style={styles.aboutAppMainStyle}>
        <Text>Your Plants</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboutAppMainStyle: {
      marginTop: 20
  }
});

export default ListPlants;