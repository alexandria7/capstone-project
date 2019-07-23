import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const IndividualThread = (props) => {
    const question = props.navigation.getParam('question');
    const questionBody = props.navigation.getParam('questionBody');
    const userId = props.navigation.getParam('userId');
    const userName = props.navigation.getParam('userName');
    const discussionKey = props.navigation.getParam('discussionKey');
    const date = props.navigation.getParam('date');
    let comments = undefined;

    firebase.database().ref(`/discussions/${discussionKey}/comments`)
        .on('value', snapshot => {
            console.log('snapshot of all comments', snapshot.val());
            comments = _.map(snapshot.val(), (commentObject, key) => {
                commentObject.key = key;
                return commentObject;
            });
        })

    const onDeletePostPress = () => {
        Alert.alert(
            `Are you sure you want to delete this thread?`,
            'All of it will be deleted including the comments.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => deletePost()}
            ]
          )
    };

    const deletePost = () => {
        console.log(`post with id ${discussionKey} is about to be deleted`)
        
        const postToDelete = firebase.database().ref(`/discussions/${discussionKey}`);

        postToDelete
            .remove()
            .then(() => {
                console.log('post was deleted...')
                props.navigation.navigate('Discussions'); 
            })
    };

    const onDeleteCommentPress = (commentKey) => {
        console.log('i\'m in onDeleteCommentPress and the comment id is: ', commentKey);
        Alert.alert(
            `Are you sure you want to delete this comment?`,
            'It will be permanently deleted from this discussion thread.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => deleteComment(commentKey)}
            ]
          )
    };

    const deleteComment = (commentKey) => {
        console.log(`comment with id ${commentKey} is about to be deleted`)
        
        const commentToDelete = firebase.database().ref(`/discussions/${discussionKey}/comments/${commentKey}`);

        commentToDelete
            .remove()
            .then(() => {
                // const commentByUserRef = firebase.database().ref(`/users/${userId}/discussionsCommented`); //root reference to your data
                // commentByUserRef.orderByChild('comment_key').equalTo(`${commentKey}`)
                //     .once('value').then((snapshot) => {
                //         snapshot.forEach((childSnapshot) => {
                //         //remove each child
                //         commentByUserRef.child(childSnapshot.key)
                //         .remove()
                //         .then(() => {console.log('comment reference deleted from user')})
                //         .catch((error) => {console.log('there was an error deleting this comment\'s ref from the user: ', error)})
                //     });
                // });

            })

            console.log('comment was deleted...')
            props.navigation.navigate('IndividualThread', {discussionKey});
    };

    const allComments = comments.map((comment, i) => 
        <View key={i} style={styles.commentSectionStyle}>
            <Text style={styles.commentUserNameStyle}>{comment["comment_user_name"]}</Text>
            <Text>{comment["date"]}</Text>
            <Text>{comment["comment"]}</Text>
            {
                comment["comment_user_id"] === firebase.auth().currentUser.uid ? 
                <View>
                    <Button 
                        title="Edit"
                        onPress={() => props.navigation.navigate("EditComment", {
                            discussionKey,
                            commentKey: comment["key"],
                            comment: comment["comment"],
                            question
                        })}
                    />
                    <Button 
                        title="Delete"
                        onPress={() => onDeleteCommentPress(comment["key"])}
                    />
                </View>
                : null
            }
        </View>
    );

    return (
        <View style={styles.aboutAppMainStyle}>
            <View style={styles.headerStyle}>
                <TouchableOpacity 
                onPress={ () => props.navigation.openDrawer() }
                >
                    <Image 
                        style={styles.headerImageStyle}
                        source={require('../images/nav-burger-transparent.png')}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>Wet Your Plants</Text>
            </View>

            <ScrollView>
                <View style={styles.discussionMainSectionStyle}>
                    <Text style={styles.discussionHeader}>Discussion Thread</Text>
                    <View style={styles.questionTitleStyle}>
                        <Text style={styles.questionTitleText}>{question}</Text>
                        <Text style={styles.aboutPostText}>{date}</Text>
                        <Text style={styles.aboutPostText}>Posted by {userName}</Text>
                        <Text style={styles.postBodyStyle}>{questionBody}</Text>
                        {
                            firebase.auth().currentUser.uid === userId ? 
                            <Button 
                                title="Edit Thread"
                                onPress={() => props.navigation.navigate('EditThread', {
                                    discussionKey, questionBody, question
                                })}
                            /> : null
                        }
                        {
                            firebase.auth().currentUser.uid === userId ? 
                            <Button 
                                title="Delete Thread"
                                onPress={() => onDeletePostPress()}
                            /> : null 
                        }
                    </View>
                </View>

                <View style={styles.discussionCommentSection}>
                    <View>
                        <Text style={styles.commentNumber}>{allComments.length} Comment(s)</Text>
                        {allComments.length !== 0 ? 
                            <View>{allComments}</View> :
                            <Text style={styles.noCommentsNoticeStyle}>No comments yet...</Text>
                        }
                    </View>

                    <View>
                        <Button 
                            title="Add Comment"
                            onPress={() => props.navigation.navigate('AddComment', {discussionKey})}
                        />
                    </View>

                </View>
            </ScrollView>

        </View>
    )
};

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
    discussionMainSectionStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
    },
    discussionHeader: {
        fontWeight: 'bold',
        color: '#7A7E7B',
        fontSize: 15,
        marginTop: 20
    },
    questionTitleStyle: {
        marginTop: 20,
        paddingBottom: 12,
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
    },
    questionTitleText: {
        fontSize: 30,
    },
    aboutPostText: {
        fontStyle: 'italic',
        marginTop: 10
    },
    postBodyStyle: {
        marginTop: 15,
        fontSize: 17
    },
    discussionCommentSection: {
        margin: 10, 
    },
    noCommentsNoticeStyle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 25
    },
    commentNumber: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    commentUserNameStyle: {
        color: '#055607',
        fontWeight: 'bold',
        marginBottom: 10
    },
    commentSectionStyle: {
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        paddingTop: 10, 
        paddingBottom: 10
    }
});

export default IndividualThread;