import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Alert, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../components/Styles';

class AddImage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            plantImage: undefined,
            plantKey: this.props.navigation.getParam('plantKey'),
            hasCameraPermission: null
        }

        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantImage: undefined,
                    plantKey: this.props.navigation.getParam('plantKey'),
                    hasCameraPermission: null
                })
            }
        )
    }

    componentDidMount() {
        this.checkImagePermission();
    }

    checkImagePermission = async () => {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const hasCameraPermission = (camera.status === 'granted' || cameraRoll.status === 'granted')

        this.setState({hasCameraPermission});
    }

    onGetImagePress = async (type) => {
        let result = undefined;

        if (type === 'camera') {
            result = await ImagePicker.launchCameraAsync();
        } else if (type === 'library') {
            result = await ImagePicker.launchImageLibraryAsync();
        }

        if (!result.cancelled) {
            console.log(result);
            this.uploadImage(result.uri, "test-image5")
              .then(() => {
                Alert.alert("Success!");
                this.setState({plantImage: result})
              })
              .catch((error) => {
                Alert.alert(`there was an error: ${error}`)
              })
            //   .then(() => {
            //       this.saveImageToDatabase(result);
            //   })
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/${imageName}`);
        return ref.put(blob);
    }

    saveImageToDatabase = () => {
        // const plantKey = this.state.plantKey;

        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}`)
        .update({
            image: this.state.plantImage
        })
        .then(() => {
            console.log('this is in addImage saveImageToDatabase and we\'re gonna go back to plant')
            console.log(this.state)

            this.props.navigation.navigate('Plant', {
                plantImage: this.state.plantImage,
                plantKey: this.state.plantKey
            });
        })
    }

    render() {
        return (
            <View style={{marginTop: 70}}>
                <Button 
                    title="Take Photo"
                    onPress={() => this.onGetImagePress('camera')}
                />

                <Button 
                    title="Choose Photo From Library"
                    onPress={() => this.onGetImagePress('library')}
                />

                {this.state.plantImage ? 
                <View>
                    <Image 
                        style={styles.plantImageStyle}
                        source={{uri: this.state.plantImage["uri"]}}
                    /> 
                    <Button 
                        title="Submit!"
                        onPress={() => this.saveImageToDatabase()} 
                    />
                </View>
                : null}


            </View>
        )
    }
}

export default AddImage;