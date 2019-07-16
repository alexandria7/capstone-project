import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';

class Home extends Component {
  render() {

    const loggedInUser = firebase.auth().currentUser;

    return (
      <View style={styles.mainHomepageContainer}>
        <Text style={styles.titleStyle}>Wet Your Plants</Text>

        <Image 
          style={styles.imageStyle}
          source={require('../images/adansonii-transparent.png')}
        />

        <View style={styles.greetingStyle}>
          <Text style={styles.greetingText}>{`Hello, ${loggedInUser.displayName}!`}</Text>
          <TouchableOpacity 
              onPress={ () => firebase.auth().signOut() }
          >
            <Text style={styles.greetingButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainerStyle}>
          <Button 
              title="My Plants"
              onPress={ () => this.props.navigation.navigate('ListPlants') }
          />

          <Button 
              title="Add Plant"
              onPress={ () => this.props.navigation.navigate('AddPlant') }
          />

          {/* <Button 
            title="My Notifications"
          /> */}

          <Button 
            title="Discussion Forum"
            onPress={ () => this.props.navigation.navigate('Discussions') }
          />

          <Button 
            title="My Conversations"
          />
        </View>

        <View style={styles.aboutAppStyle}>
          <TouchableOpacity 
            onPress={ () => this.props.navigation.navigate('AboutApp') }
          >
            <Text style={styles.aboutAppButtonText}>About Wet Your Plants</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainHomepageContainer: {
    flex: 1,
    backgroundColor: '#BDE1C9', 
    // justifyContent: 'center'
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
  greetingStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 15,
    color: '#055607',
    fontWeight: 'bold'
  },
  greetingButtonText: {
    fontSize: 15,
    color: '#055607'
  },
  buttonContainerStyle: {
    marginTop: 50
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

