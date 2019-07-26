import React from 'react';
import firebase from 'firebase';
import { View, Text, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../components/Styles';

const Home = (props) => {
  const loggedInUser = firebase.auth().currentUser;

  return (
    <View style={styles.aboutAppMainStyle}>
      <Text style={styles.titleStyle}>wet your plants</Text>

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

      <View style={styles.homeButtonContainerStyle}>
        <TouchableOpacity 
            onPress={ () => props.navigation.navigate('ListPlants') }
            style={styles.homeButtonTouchStyle}
        >
          <Text style={styles.homeButtonTextStyle}>My Plants</Text>
        </TouchableOpacity>   

        <TouchableOpacity 
            onPress={ () => props.navigation.navigate('AddPlant') }
            style={styles.homeButtonTouchStyle}
        >
          <Text style={styles.homeButtonTextStyle}>Add Plant</Text>
        </TouchableOpacity>  

        <TouchableOpacity 
          onPress={ () => props.navigation.navigate('Discussions') }
          style={styles.homeButtonTouchStyle}
        >
          <Text style={styles.homeButtonTextStyle}>Discussion Forum</Text>
        </TouchableOpacity> 

        <TouchableOpacity 
          onPress={ () => props.navigation.navigate('MyConversations') }
          style={styles.homeButtonTouchStyle}
        >
          <Text style={styles.homeButtonTextStyle}>My Conversations</Text>
        </TouchableOpacity>  
      </View>

      <View style={styles.aboutAppStyle}>
        <TouchableOpacity 
          onPress={ () => props.navigation.navigate('AboutApp') }
        >
          <Text style={styles.aboutAppButtonText}>About Wet Your Plants</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

