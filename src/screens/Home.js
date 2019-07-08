import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Plant Momma</Text>

        <Button 
            title="My Plants"
            onPress={ () => this.props.navigation.navigate('ListPlants') }
        />

        <Button 
            title="Add Plant"
            onPress={ () => this.props.navigation.navigate('AddPlant') }
        />

        <Button 
          title="About Plant Mamma"
          onPress={ () => this.props.navigation.navigate('AboutApp') }
        />
      </View>
    );
  }
}

export default Home;

