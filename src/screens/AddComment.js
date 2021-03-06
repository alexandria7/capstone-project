import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import Header from '../components/Header';
import styles from '../components/Styles';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            question: this.props.navigation.getParam('question'),
            comment: '',
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    question: this.props.navigation.getParam('question'),
                    comment: '',
                })
            }
        )
    }

    onSubmitCommentPress = () => {
        if (this.state.comment.trim() === "" ) {
            Alert.alert(
              `Error: Comment cannot be blank.`,
              'Please enter a comment before submitting.',
              [
                {text: 'Ok', onPress: () => console.log('ok was pressed')}
              ]
            )
          } else {
            this.addCommentToDatabase();
          }
    }

    addCommentToDatabase = () => {
        const todaysDate = (new Date()).toDateString();

        const commentRef =firebase.database().ref(`/discussions/${this.state.discussionKey}/comments`)
            .push({
                comment: this.state.comment,
                comment_user_id: firebase.auth().currentUser.uid,
                comment_user_name: firebase.auth().currentUser.displayName,
                date: todaysDate
            }).key

        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`)
            .push({
                id: this.state.discussionKey,
                comment_key: commentRef
            })
            .then(() => {
                this.setState({ comment: '' })
                this.props.navigation.navigate('IndividualThread', {
                    discussionKey: this.state.discussionKey,
                })
            })
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Add A Comment</Text>
                    <Text style={styles.editCommentContextSection}>From thread "{this.state.question}"</Text>

                    <View style={styles.textAreaContainer}>
                        <TextInput 
                            placeholder="your comment here"
                            value={this.state.comment}
                            onChangeText={(comment) => this.setState({comment})}
                            multiline = {true}
                            numberOfLines = {4}
                            editable = {true}
                            clearButtonMode='always'
                            style={styles.noteTextArea}
                        />
                    </View>
                    <View style={styles.addButtonContainerStyle}>
                        <TouchableOpacity 
                            style={styles.cancelButtonTouchStyle}
                            onPress={() => this.props.navigation.navigate('IndividualThread', {
                                discussionKey: this.props.navigation.getParam('discussionKey')
                            })}
                        >
                            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  
                            style={styles.addButtonTouchStyle}
                            onPress={() => this.onSubmitCommentPress()}
                        >
                            <Text style={styles.addButtonTextStyle}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

export default AddComment;