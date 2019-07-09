import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={styles.mainHomepageContainer}>
        <Text style={styles.titleStyle}>Plant Momma</Text>

        <Image 
          style={styles.imageStyle}
          source={require('../images/adansonii-transparent.png')}
        />

        <Button 
            title="My Plants"
            onPress={ () => this.props.navigation.navigate('ListPlants') }
        />

        <Button 
            title="Add Plant"
            onPress={ () => this.props.navigation.navigate('AddPlant') }
        />

        <View style={styles.aboutAppStyle}>
          <TouchableOpacity 
            onPress={ () => this.props.navigation.navigate('AboutApp') }
          >
            <Text style={styles.aboutAppButtonText}>About Plant Momma</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainHomepageContainer: {
    flex: 1,
    backgroundColor: '#BDE1C9'
  },
  titleStyle: {
      fontSize: 50,
      color: '#055607',
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 50,
      paddingTop: 10
  },
  imageStyle: {
    width: 85, 
    height: 85,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  aboutAppStyle: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  aboutAppButtonText: {
    fontSize: 15,
    color: '#055607'
  }
});

export default Home;

