import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';

class Auth extends Component {
    render() {
        return (
            <View style={styles.mainLoginStyle}>
                <Text style={styles.titleStyle}>Wet Your Plants</Text>

                <Image 
                style={styles.imageStyle}
                source={require('../images/adansonii-transparent.png')}
                />

                <Text>Please Log In</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainLoginStyle: {
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

export default Auth;