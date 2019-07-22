import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';

class AddComment extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comment: '',
        };
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
        const discussionKey = this.props.navigation.getParam('discussionKey');
        const todaysDate = (new Date()).toDateString();

        firebase.database().ref(`/discussions/${discussionKey}/comments`)
            .push({
                comment: this.state.comment,
                comment_user_id: firebase.auth().currentUser.uid,
                comment_user_name: firebase.auth().currentUser.displayName,
                date: todaysDate
            })
            .then(() => {
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`)
                    .push({
                        id: this.props.navigation.getParam('discussionKey'),
                    })
                    // .then(() => {
                this.props.navigation.navigate('IndividualThread', {
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    // comment: this.state.comment,
                    // commentUserName: firebase.auth().currentUser.displayName,
                    // date: todaysDate,
                    // comments: firebase.database().ref(`/discussions/${discussionKey}/comments`)
                })
    
                this.setState({ comment: '' })
                    // })
            })
                // .then(() => {
                //     this.props.navigation.navigate('IndividualThread', {
                //         comment: this.state.comment,
                //         commentUserName: firebase.auth().currentUser.displayName,
                //         date: todaysDate
                //     })
        
                //     this.setState({ comment: '' })
                // })
            .catch((error) => {
                console.log('there was an error with adding this comment: ', error)
                this.props.navigation.navigate('Discussions')

                // there was an error with adding this comment:  
                // [Error: Reference.push failed: first argument contains undefined in property 
                // 'users.2cjXqWke1LYHpaLRBYGw2WGoaX53.discussionsCommented.id']
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

                <View style={styles.mainCommentSection}>
                    <Text>Hey I'm a Comment</Text>
                    <Text>The discussion id that i just came from is ${this.props.navigation.getParam('discussionKey')}</Text>

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

const styles = StyleSheet.create({
    aboutAppMainStyle: {
        // marginTop: 20,
        flex: 1,
        backgroundColor: '#BDE1C9', 
    },
    headerStyle: {
        height: 70,
        paddingTop: 30, 
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        justifyContent: 'space-around',
        backgroundColor: '#EFDECE'
    },
    headerText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 22,
        color: '#055607',
        fontWeight: 'bold',
        paddingBottom: 40,
        paddingTop: 0
    },
    headerImageStyle: {
        width: 28, 
        height: 28,
        marginLeft: 10,
        marginTop: 10
    },
    mainCommentSection: {
        marginTop: 10
    }
})

export default AddComment;