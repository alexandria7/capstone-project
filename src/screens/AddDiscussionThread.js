import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Header from '../components/Header';
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
        hasCameraPermission: null,
        loadingImage: false
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

  addInfoToDatabaseAndClear = () => {
    console.log('submit was pressed')
    
    const todaysDate = (new Date()).toDateString();

    if (this.state.threadImage) {
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
        // threadImage: this.state.threadImage
      })
    } else {
      const dataRef = firebase.database().ref('/discussions')
      .push({
        question: this.state.question,
        question_body: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        date: todaysDate,
      }).key

      console.log('the discussion thread key that was just created is', dataRef)

      this.props.navigation.navigate('IndividualThread', {
        question: this.state.question,
        questionBody: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        discussionKey: dataRef,
        date: todaysDate,
      })
    }

    

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
        <Header drawerNav={this.props.navigation.openDrawer}/>

        <View style={styles.mainEditSectionStyle}>
        
          <View>
            <Text style={styles.editTextHeaderStyle}>Start a Discussion Thread</Text>
            <Text style={styles.subTitleStyle}>Got a planty question, concern, or comment? Post away and other users can comment with their thoughts!</Text>
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
                  placeholder="expand on your question, give some more detail, etc."
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
              <Text style={styles.inputTitleStyle}>(Optional) Add a Photo:</Text>

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
            </View>

            {
              this.state.loadingImage ? 
              <View style={styles.loadingDiscussionImageStyle}>
                  <ActivityIndicator size='large'/> 
              </View>
              : null
            }

            {this.state.threadImage ? 
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                    <Image 
                        style={{width: 200, height: 200}}
                        source={{uri: this.state.threadImage["uri"]}}
                    /> 
                </View> : null
            }

            <View style={styles.addButtonContainerStyle}>
              <TouchableOpacity 
                  onPress={ () => this.props.navigation.navigate('Discussions') }
                  style={styles.cancelButtonTouchStyle}
              >
                <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
              </TouchableOpacity>  

              <TouchableOpacity 
                onPress={() => this.onSubmitDiscussionThreadPress()}
                style={styles.addButtonTouchStyle}
              >
                <Text style={styles.addButtonTextStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
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
