import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

class Loading extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn() {
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
                    style={styles.imageStyle}
                    source={require('../images/pothos-transparent.png')}
                />

                <ActivityIndicator size='large'/>

                <Text>Loading...Planty things await...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainLoadingContainer: {
        flex: 1,
        backgroundColor: '#BDE1C9',
        justifyContent: 'center' 
    },
    imageStyle: {
        width: 85, 
        height: 85,
        alignSelf: 'center',
        // marginTop: 30,
        // marginBottom: 30
    }
});

export default Loading;