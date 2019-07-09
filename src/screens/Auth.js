import React, { Component } from 'react';
import * as Expo from 'expo';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config';

class Auth extends Component {
    async signInWithGoogleAsync() {
        try {
          const result = await Expo.Google.logInAsync({
            behavior: 'web',
            iosClientId: '673892001378-v8mvtf1rga472rco10e6l207ilbkk9i0.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    render() {
        return (
            <View style={styles.mainLoginStyle}>
                <Text style={styles.titleStyle}>Wet Your Plants</Text>

                <Image 
                style={styles.imageStyle}
                source={require('../images/adansonii-transparent.png')}
                />

                <Button
                    title='Sign in with Google'
                    onPress={() => this.signInWithGoogleAsync()}
                />
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