import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Alert, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Header from '../components/Header';
import styles from '../components/Styles';

class AddImage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            plantImage: this.props.navigation.getParam('plantImage'),
            plantKey: this.props.navigation.getParam('plantKey'),
            hasCameraPermission: null,
            loadingImage: false
        }

        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantImage: this.props.navigation.getParam('plantImage'),
                    plantKey: this.props.navigation.getParam('plantKey'),
                    hasCameraPermission: null,
                    loadingImage: false
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

            const uriString = result.uri;
            const splitUri = uriString.split("/");
            const imageRef = splitUri[splitUri.length - 1];

            this.uploadImage(result.uri, imageRef)
              .then(() => {
                this.setState({
                    loadingImage: false,
                    plantImage: result
                });
              })
              .catch((error) => {
                Alert.alert(`there was an error: ${error}`)
              })
        }
    }

    uploadImage = async (uri, imageName) => {
        this.setState({loadingImage: true});

        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/${imageName}`);
        return ref.put(blob);
    }

    saveImageToDatabase = () => {
        
        if (this.state.plantImage) {
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
        } else {
            this.props.navigation.navigate('Plant', {
                plantImage: this.state.plantImage,
                plantKey: this.state.plantKey
            });
        }
        
    }

    onDeleteImagePress = () => {
        Alert.alert(
            `Are you sure you want to delete this photo?`,
            'This will permanently remove the photo from the database.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => this.deletePhoto()}
            ]
          )
    }

    deletePhoto = () => {
        const photoToDelete = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}/image`)

        photoToDelete
        .remove()
        .then(() => {
            this.setState({plantImage: undefined})
        })
        .catch((error) => {
            console.log('there was an error deleting this image from the database: ', error)
        })

        this.props.navigation.navigate('Plant', {
            plantImage: this.state.plantImage,
            plantKey: this.state.plantKey
        });
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/> 

                <View style={styles.mainEditSectionStyle}>

                    <Text style={styles.editTextHeaderStyle}>Update Plant Photo</Text>

                    {
                        this.state.loadingImage ? 
                        <View style={styles.loadingPlantsListStyle}>
                            <ActivityIndicator size='large'/> 
                        </View>
                        : null
                    }
        
                    {this.state.plantImage ? 
                    <View>
                        <Image 
                            style={styles.plantImageStyle}
                            source={{uri: this.state.plantImage["uri"]}}
                        /> 

                        <TouchableOpacity 
                            style={styles.photoChoiceTouchStyle}
                            onPress={() => this.onDeleteImagePress()}
                        >
                            <Text style={styles.deletePhotoTextStyle}>Delete current photo</Text>
                        </TouchableOpacity>
                    </View>
                    : null}

                    <View style={styles.photoChoiceButtonSectionStyle}>
                        <TouchableOpacity 
                            onPress={() => this.onGetImagePress('camera')}
                            style={styles.photoChoiceTouchStyle}
                        >
                            <Text style={styles.photoChoiceTextStyle}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onGetImagePress('library')}
                            style={styles.photoChoiceTouchStyle}
                        >
                            <Text style={styles.photoChoiceTextStyle}>Choose From Library</Text>
                        </TouchableOpacity>
                    </View>     

                    <View style={styles.addButtonContainerStyle}>
                        <TouchableOpacity 
                            style={styles.cancelButtonTouchStyle}
                            onPress={() => this.props.navigation.navigate("Plant", {plantKey: this.state.plantKey})}
                        >
                            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
                        </TouchableOpacity>

                        {this.state.plantImage ? 
                            <TouchableOpacity 
                                style={styles.addButtonTouchStyle}
                                onPress={() => this.saveImageToDatabase()} 
                            >
                                <Text style={styles.addButtonTextStyle}>Submit</Text>
                            </TouchableOpacity>
                        : null}
                    </View>
                </View>
            </View>
        )
    }
}

export default AddImage;