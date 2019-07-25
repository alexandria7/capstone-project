import React, { Component } from 'react';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Text, View, Button, Alert, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

class EditThread extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            question: this.props.navigation.getParam('question'),
            questionBody: this.props.navigation.getParam('questionBody'),
            threadImage: this.props.navigation.getParam('threadImage'),
            hasCameraPermission: null,
            loadingImage: false
        };
        
        console.log(this.state.threadImage)
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    question: this.props.navigation.getParam('question'),
                    questionBody: this.props.navigation.getParam('questionBody'),
                    threadImage: this.props.navigation.getParam('threadImage'),
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
    
        const hasCameraPermission = (camera.status === 'granted' || cameraRoll.status === 'granted');
    
        this.setState({hasCameraPermission});
    }

    onCancelPress = () => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            question: this.props.navigation.getParam('question'),
            questionBody: this.props.navigation.getParam('questionBody'),
            threadImage: this.props.navigation.getParam('threadImage')
        });
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
                    threadImage: result
                })
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

    onEditThreadButtonPress = () => {
        if (this.state.question.trim() === "" ) {
            Alert.alert(
                `Error: No text in your post title.`,
                'Please enter a question or comment before submitting.',
                [
                  {text: 'Ok', onPress: () => console.log('ok was pressed')}
                ]
              )
        } else {
          this.updateInfoToDatabase();
        }
    }

    updateInfoToDatabase = () => {
        if (this.state.threadImage) {
            firebase.database().ref(`/discussions/${this.state.discussionKey}`)
                .update({
                    question: this.state.question,
                    question_body: this.state.questionBody,
                    threadImage: this.state.threadImage
                })
                .then(() => {
                    this.props.navigation.navigate('IndividualThread', {
                        discussionKey: this.state.discussionKey,
                        question: this.state.question,
                        questionBody: this.state.questionBody,
                        threadImage: this.state.threadImage
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            firebase.database().ref(`/discussions/${this.state.discussionKey}`)
                .update({
                    question: this.state.question,
                    question_body: this.state.questionBody,
                })
                .then(() => {
                    this.props.navigation.navigate('IndividualThread', {
                        discussionKey: this.state.discussionKey,
                        question: this.state.question,
                        questionBody: this.state.questionBody,
                        threadImage: this.state.threadImage
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        
    }

    onDeletePhotoPress = () => {
        Alert.alert(
            `Are you sure you want to delete this photo?`,
            'This will permanently remove the image from the discussion thread.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => this.deletePhoto()}
            ]
          )
    }

    deletePhoto = () => {
        const photoToDelete = firebase.database().ref(`/discussions/${this.state.discussionKey}/threadImage`);

        photoToDelete
        .remove()
        .then(() => {
            this.setState({threadImage: undefined})
        })
        .catch((error) => {
            console.log('there was an error deleting this image from the database: ', error)
        })
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>

                    <Text style={styles.editTextHeaderStyle}>Edit Discussion Thread</Text>

                    <ScrollView>
                        <View style={styles.inputSectionStyle}>
                            <Text style={styles.inputTitleStyle}>Question:</Text>
                            <TextInput 
                                placeholder="new question"
                                value={this.state.question}
                                onChangeText={(question) => this.setState({question})}
                                clearButtonMode='always'
                            />
                        </View>

                        <View style={styles.inputSectionStyle}>
                            <Text style={styles.inputTitleStyle}>Body: </Text>
                            <View style={styles.textAreaContainer} >
                                <TextInput 
                                placeholder="expand on your question, post pictures, etc."
                                multiline = {true}
                                numberOfLines = {4}
                                editable = {true}
                                value={this.state.questionBody}
                                onChangeText={(questionBody) => this.setState({questionBody})}
                                clearButtonMode='always'
                                style={styles.noteTextArea}
                                />
                            </View>
                        </View>


                        {
                            this.state.loadingImage ? 
                            <View style={styles.loadingDiscussionImageStyle}>
                                <ActivityIndicator size='large'/> 
                            </View>
                            : null
                        }
                        
                        {
                            this.state.threadImage ?
                            <View>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                    <Image 
                                        style={{width: 150, height: 150}}
                                        source={{uri: this.state.threadImage["uri"]}}
                                    />
                                </View>
                                <Button 
                                    title="Delete photo"
                                    onPress={() => this.onDeletePhotoPress()}
                                />
                                <Text>Update photo:</Text>
                            </View> :
                            <View>
                                <Text>Add image to thread:</Text>
                            </View>
                        }
                        
                        <Button 
                            title="Take Photo"
                            onPress={() => this.onGetImagePress('camera')}
                        />

                        <Button 
                            title="Choose Photo From Library"
                            onPress={() => this.onGetImagePress('library')}
                        />

                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Cancel"
                                onPress={() => this.onCancelPress()}
                            />

                            <Button 
                                title="Update"
                                onPress={() => this.onEditThreadButtonPress()}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default EditThread;