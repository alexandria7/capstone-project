import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Image, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../components/Styles';

class AddDiscussionThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
        question: '',
        questionBody: '',
        userId: '',
        userName: '',
        threadImage: undefined,
        hasCameraPermission: null
    };
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

  onSubmitDiscussionThreadPress = () => {
    if (this.state.question.trim() === "" ) {
      Alert.alert(
        `Error: No text in your post title.`,
        'Please enter a question or comment before submitting.',
        [
          {text: 'Ok', onPress: () => console.log('ok was pressed')}
          // {text: 'Delete', onPress: () => deletePlant()}
        ]
      )
    } else {
      this.addInfoToDatabaseAndClear();
    }
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
            Alert.alert("Success!");
            this.setState({threadImage: result})
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

  addInfoToDatabaseAndClear = () => {
    console.log('submit was pressed')
    
    const todaysDate = (new Date()).toDateString();

    const dataRef = firebase.database().ref('/discussions')
      .push({
        question: this.state.question,
        question_body: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        date: todaysDate,
        threadImage: this.state.threadImage
      }).key

      console.log('the discussion thread key that was just created is', dataRef)

      this.props.navigation.navigate('IndividualThread', {
        question: this.state.question,
        questionBody: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        discussionKey: dataRef,
        date: todaysDate,
        threadImage: this.state.threadImage
      })

      console.log('about to reset the state!!!!!')
      this.setState({
          question: '',
          questionBody: '',
          userId: '',
          userName: '',
          threadImage: undefined,
          hasCameraPermission: null
      });
      console.log('i should have just reset my state!!!!')
    
  }

  render() {
    return (
      <View style={styles.aboutAppMainStyle}>
        <View style={styles.headerStyle}>
          <TouchableOpacity 
            onPress={ () => this.props.navigation.openDrawer() }
          >
            <Image 
              style={styles.headerImageStyle}
              source={require('../images/nav-burger-transparent.png')}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Wet Your Plants</Text>
        </View>

        <View style={styles.mainEditSectionStyle}>
        
          <View>
            <Text style={styles.editTextHeaderStyle}>Start a Discussion Thread</Text>
            <Text style={styles.addDiscussionBlurb}>Got a planty question, concern, or comment? Post away and other users can comment with their thoughts!</Text>
          </View>

          <ScrollView>
            <View style={styles.inputSectionStyle}>
              <Text style={styles.inputTitleStyle}>Question/Thread Title: </Text>
              <TextInput 
                placeholder="My pothos' leaves are turning brown. Help?"
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

            <View>
              <Text>(Optional) Add a Photo</Text>
              <Button 
                    title="Take Photo"
                    onPress={() => this.onGetImagePress('camera')}
                />

                <Button 
                    title="Choose Photo From Library"
                    onPress={() => this.onGetImagePress('library')}
                />
            </View>

            {this.state.threadImage ? 
                <View>
                    <Image 
                        style={styles.plantImageStyle}
                        source={{uri: this.state.threadImage["uri"]}}
                    /> 
                </View> : null
            }

            <Button 
                title="Cancel"
                onPress={ () => this.props.navigation.navigate('Discussions') }
            />

            <Button 
              title="Submit"
              onPress={() => this.onSubmitDiscussionThreadPress()}
            />
          </ScrollView>
        </View>

      </View>
    );
  }
}

// const styles = StyleSheet.create({
  // addPlantMainStyle: {
  //     // marginTop: 20,
  //     flex: 1,
  //     backgroundColor: '#BDE1C9', 
  //     // justifyContent: 'space-between'
  // },
  // headerStyle: {
  //   height: 70,
  //   paddingTop: 30, 
  //   borderColor: '#7A7E7B',
  //   borderBottomWidth: 0.5,
  //   justifyContent: 'space-around',
  //   backgroundColor: '#EFDECE'
  // },
  // headerText: {
  //   alignSelf: 'center',
  //   textAlign: 'center',
  //   fontSize: 22,
  //   color: '#055607',
  //   fontWeight: 'bold',
  //   paddingBottom: 40,
  //   paddingTop: 0
  // },
  // headerImageStyle: {
  //   width: 28, 
  //   height: 28,
  //   marginLeft: 10,
  //   marginTop: 10
  // },
  // addDiscussionForm: {
  //   marginLeft: 10,
  //   marginRight: 10,
  //   paddingTop: 20,
  //   flex: 1
  // },
  // addDiscussionTitle: {
  //   fontSize: 35,
  //   fontWeight: 'bold',
  //   color: '#055607',
  //   textAlign: 'center',
  //   marginBottom: 15
  // },  
  // addDiscussionBlurb: {
  //   textAlign: 'center',
  //   fontSize: 15,
  //   fontWeight: '800',
  //   marginBottom: 20
  //   // fontStyle: 'italic'
  // },
  // inputSectionStyle: {
  //   marginBottom: 20
  // }, 
  // inputTitleStyle: {
  //   fontSize: 15,
  //   color: '#055607',
  //   fontWeight: 'bold'
  // }, 
  // datePickerStyle: {
  //   width: 200
  // },
//   questionBodyTextArea: {
//     height: 100,
//     justifyContent: "flex-start"
//   },
//   // textAreaContainer: {
//   //   borderWidth: 0.5,
//   // },
// });

export default AddDiscussionThread;
