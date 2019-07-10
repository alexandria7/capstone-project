import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class ListPlants extends Component {
  render() {
    return (
      <View style={styles.aboutAppMainStyle}>
        <Button
          title='Open'
          onPress={ () => this.props.navigation.openDrawer() }
        />

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