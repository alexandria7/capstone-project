import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Alert, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

class AddImage extends Component {
    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            this.uploadImage(result.uri, "test-image")
              .then(() => {
                Alert.alert("Success!")
              })
              .catch((error) => {
                Alert.alert(`there was an error: ${error}`)
              })
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/${imageName}`);
        return ref.put(blob);
    }

    render() {
        return (
            <View style={{marginTop: 30}}>
                <Button 
                    title="Choose Image"
                    onPress={this.onChooseImagePress}
                />
            </View>
        )
    }
}

export default AddImage;