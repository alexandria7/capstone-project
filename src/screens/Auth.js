import React, { Component } from 'react';
import * as Expo from 'expo';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';

class Auth extends Component {

    //taken from Firebase Google sign-in docs
    isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
          for (const i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
    }

    //taken from Firebase Google sign-in docs
    onSignIn(googleUser) {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            const credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(function(result) {
                console.log('user signed in!');
                console.log('result.user.uid is', result.user.uid);
                console.log('firebase.auth() is', firebase.auth().uid)
                // firebase.database().ref('/')
            })
            .catch(function(error) {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in to Firebase.');
          }
        }.bind(this));
      }

      // from Expo Google sign-in docs
      async signInWithGoogleAsync () {
        try {
          const result = await Expo.Google.logInAsync({
            // behavior: 'web',
            iosClientId: '673892001378-v8mvtf1rga472rco10e6l207ilbkk9i0.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
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