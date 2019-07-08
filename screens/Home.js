import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>

        <Button 
            title="My Plants"
            onPress={ () => this.props.navigation.navigate('ListPlants') }
        />

      </View>
    );
  }
}

export default Home;

