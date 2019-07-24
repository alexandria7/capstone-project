import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

class EditComment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            commentKey: this.props.navigation.getParam('commentKey'),
            comment: this.props.navigation.getParam('comment'),
            question: this.props.navigation.getParam('question')
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    commentKey: this.props.navigation.getParam('commentKey'),
                    comment: this.props.navigation.getParam('comment'),
                    question: this.props.navigation.getParam('question')
                })
            }
        )
    }

    onCancelPress = () => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: this.props.navigation.getParam('discussionKey'),
        });
    }

    onEditCommentButtonPress = () => {
        if (this.state.comment.trim() === "" ) {
            Alert.alert(
              `Error: Comment cannot be blank.`,
              'Please enter a comment before submitting.',
              [
                {text: 'Ok', onPress: () => console.log('ok was pressed')}
              ]
            )
          } else {
            this.updateInfoToDatabase();
          }
    }

    updateInfoToDatabase = () => {
        firebase.database().ref(`/discussions/${this.state.discussionKey}/comments/${this.state.commentKey}`)
        .update({
            comment: this.state.comment
        })
        .then(() => {
            
            this.props.navigation.navigate('IndividualThread', {
                discussionKey: this.state.discussionKey,
                comment: this.state.comment,
                // question: this.state.question
            });
            
        })
        .catch((error) => {
            console.log('there was an error updating the comment: ', error)
            this.props.navigation.navigate('IndividualThread', {
                discussionKey: this.state.discussionKey,
            });
        })
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Edit comment</Text>
                    <Text style={styles.editCommentContextSection}>From thread "{this.state.question}"</Text>

                    <View style={styles.textAreaContainer} >
                        <TextInput 
                            placeholder="new comment"
                            value={this.state.comment}
                            onChangeText={(comment) => this.setState({comment})}
                            multiline = {true}
                            numberOfLines = {4}
                            editable = {true}
                            clearButtonMode='always'
                            style={styles.noteTextArea}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.onCancelPress()}
                        />

                        <Button 
                            title="Update"
                            onPress={() => this.onEditCommentButtonPress()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default EditComment;