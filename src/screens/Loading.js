import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
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

export default Loading;