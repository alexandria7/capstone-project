import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';
import styles from '../components/Styles';

class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Home')
            } else {
                this.props.navigation.navigate('Auth')
            }
        })
    }

    render() {
        return (
            <View style={styles.mainLoadingContainer}>
                <Image 
                    style={styles.loadingImageStyle}
                    resizeMode="contain"
                    source={require('../images/pothos-transparent.png')}
                />

                <ActivityIndicator size='large'/>

                <Text style={styles.loadingTextStyle}>Planty things await...</Text>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     mainLoadingContainer: {
//         flex: 1,
//         backgroundColor: '#BDE1C9',
//         justifyContent: 'center' 
//     },
//     loadingImageStyle: {
//         // flex: 1,
//         width: 95, 
//         height: 95,
//         alignSelf: 'center',
//         // marginTop: 30,
//         marginBottom: 30,
//     },
//     loadingTextStyle: {
//         textAlign: 'center',
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#FFF',
//         marginTop: 30
//     }
// });

export default Loading;