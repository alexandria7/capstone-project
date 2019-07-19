import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Alert, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class AddImage extends Component {
    state = {
        hasCameraPermission: null 
    }
    componentDidMount() {
        this.checkImagePermission();
    }

    checkImagePermission = async () => {
        // const { status, expires, permissions } = await Permissions.getAsync(
        //     Permissions.CAMERA,
        //     Permissions.CAMERA_ROLL
        // );

        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const hasCameraPermission = (camera.status === 'granted' || cameraRoll.status === 'granted')

        this.setState({hasCameraPermission});

        // if (status !== 'granted') {
        //     Alert.alert("you didn't grant access")
        // }
    }

    onChooseImagePress = async () => {
        // let result = await ImagePicker.launchCameraAsync();
        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            console.log(result);
            this.uploadImage(result.uri, "test-image2")
              .then(() => {
                Alert.alert("Success!")
              })
              .catch((error) => {
                Alert.alert(`there was an error: ${error}`)
              })
              .then(() => {
                  this.saveImageToDatabase(result);
              })
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/${imageName}`);
        return ref.put(blob);
    }

    saveImageToDatabase = async (imageResult) => {
        const plantKey = this.props.navigation.getParam('plantKey');

        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}`)
        .update({
            image: imageResult
        })
        // .then(() => {
        //     this.props.navigation.navigate('Plant', {
        //         plantName: this.state.plantName,
        //         plantKey: this.state.plantKey
        //     });
        // })
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