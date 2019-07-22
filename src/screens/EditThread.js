import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../components/Styles';

class EditThread extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            question: this.props.navigation.getParam('question'),
            questionBody: this.props.navigation.getParam('questionBody')
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    question: this.props.navigation.getParam('question'),
                    questionBody: this.props.navigation.getParam('questionBody')
                })
            }
        )
    }

    onCancelPress = () => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            question: this.props.navigation.getParam('question'),
            questionBody: this.props.navigation.getParam('questionBody')
        });
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
        firebase.database().ref(`/discussions/${this.state.discussionKey}`)
        .update({
            question: this.state.question,
            question_body: this.state.questionBody
        })
        .then(() => {
            this.props.navigation.navigate('IndividualThread', {
                discussionKey: this.state.discussionKey,
                question: this.state.question,
                questionBody: this.state.questionBody
            });
        })
        .catch((error) => {
            console.log(error)
        })
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

                    <Text style={styles.editTextHeaderStyle}>Edit Discussion Thread</Text>

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
                </View>
            </View>
        )
    }
}

export default EditThread;