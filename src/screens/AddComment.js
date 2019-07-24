import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
                // {text: 'Delete', onPress: () => deletePlant()}
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
                    <Text>From thread "{this.state.question}"</Text>

                    <View>
                        <Text>Add Your comment:</Text>
                        <TextInput 
                            placeholder="your comment here"
                            value={this.state.comment}
                            onChangeText={(comment) => this.setState({comment})}
                            clearButtonMode='always'
                        />

                        <Button 
                            title="Cancel"
                            onPress={() => this.props.navigation.navigate('IndividualThread', {
                                discussionKey: this.props.navigation.getParam('discussionKey')
                            })}
                        />

                        <Button 
                            title="Submit Comment"
                            onPress={() => this.onSubmitCommentPress()}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     aboutAppMainStyle: {
//         // marginTop: 20,
//         flex: 1,
//         backgroundColor: '#BDE1C9', 
//     },
//     headerStyle: {
//         height: 70,
//         paddingTop: 30, 
//         borderColor: '#7A7E7B',
//         borderBottomWidth: 0.5,
//         justifyContent: 'space-around',
//         backgroundColor: '#EFDECE'
//     },
//     headerText: {
//         alignSelf: 'center',
//         textAlign: 'center',
//         fontSize: 22,
//         color: '#055607',
//         fontWeight: 'bold',
//         paddingBottom: 40,
//         paddingTop: 0
//     },
//     headerImageStyle: {
//         width: 28, 
//         height: 28,
//         marginLeft: 10,
//         marginTop: 10
//     },
//     mainCommentSection: {
//         marginTop: 10
//     }
// })

export default AddComment;