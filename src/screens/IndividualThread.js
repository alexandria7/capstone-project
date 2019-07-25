import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

const IndividualThread = (props) => {
    const question = props.navigation.getParam('question');
    const questionBody = props.navigation.getParam('questionBody');
    const userId = props.navigation.getParam('userId');
    const userName = props.navigation.getParam('userName');
    const discussionKey = props.navigation.getParam('discussionKey');
    const date = props.navigation.getParam('date');
    let comments = undefined;
    let threadImage = undefined;
    // console.log('this is the incoming thread image: ', threadImage)

    firebase.database().ref(`/discussions/${discussionKey}/comments`)
        .on('value', snapshot => {
            console.log('snapshot of all comments', snapshot.val());
            comments = _.map(snapshot.val(), (commentObject, key) => {
                commentObject.key = key;
                return commentObject;
            });
        })

    firebase.database().ref(`/discussions/${discussionKey}/threadImage`)
        .on('value', snapshot => {
            console.log('snapshot of thread object', snapshot.val());
            // console.log('snapshot of image uri: ', snapshot.val()["uri"])
            if (snapshot.val() !== null) {
                threadImage = snapshot.val();
            }
            // plantImage = snapshot.val()["image"];
            console.log('this is the thread image: ', threadImage)
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
                console.log('we deleted the thread from the discussion section, about to delete from the user section...');
                const discussionByUserRef = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`); 
                
                discussionByUserRef.orderByChild('id').equalTo(`${discussionKey}`)
                    .once('value').then((snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                        //remove each child
                        discussionByUserRef.child(childSnapshot.key).remove()
                            .then(() => {console.log('discussion reference deleted from user')})
                            .catch((error) => {console.log('there was an error deleting this discussion\'s ref from the user: ', error)})
                    });
                });
            })
            .catch((error) => {
                console.log('there was an error deleting this discussion thread: ', error);
            })

            props.navigation.navigate('Discussions'); 
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
                console.log('we deleted the comment from the discussion section, about to delete from the user section...');
                const commentByUserRef = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`); 
                
                commentByUserRef.orderByChild('comment_key').equalTo(`${commentKey}`)
                    .once('value').then((snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                        //remove each child
                        commentByUserRef.child(childSnapshot.key).remove()
                            .then(() => {console.log('comment reference deleted from user')})
                            .catch((error) => {console.log('there was an error deleting this comment\'s ref from the user: ', error)})
                    });
                });

            })
            .catch((error) => {
                console.log('there was an error deleting the comment from the database: ', error)
            })

            console.log('comment was deleted...')
            props.navigation.navigate('IndividualThread', {discussionKey});
    };

    const allComments = comments.map((comment, i) => 
        <View key={i} style={styles.commentSectionStyle}>
            <View style={styles.commentUserSection}>
                <Text style={styles.commentUserNameStyle}>{comment["comment_user_name"]}</Text>
                <Text style={styles.commentUserDateStyle}>| {comment["date"]}</Text>
            </View>
            
            <Text>{comment["comment"]}</Text>
            {
                comment["comment_user_id"] === firebase.auth().currentUser.uid ? 
                <View style={styles.commentButtonSection}>
                    <TouchableOpacity 
                        onPress={() => props.navigation.navigate("EditComment", {
                            discussionKey,
                            commentKey: comment["key"],
                            comment: comment["comment"],
                            question,
                        })}
                    >
                        <Text style={styles.editCommentButtonStyle}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => onDeleteCommentPress(comment["key"])}
                    >
                        <Text style={styles.deleteCommentButtonStyle}>Delete</Text>
                    </TouchableOpacity>    
                </View>
                : null
            }
        </View>
    );

    return (
        <View style={styles.aboutAppMainStyle}>
            <Header drawerNav={props.navigation.openDrawer}/>

            <ScrollView>
                <View style={styles.discussionMainSectionStyle}>
                    <Text style={styles.discussionHeader}>Discussion Thread</Text>
                    <View style={styles.questionTitleStyle}>
                        <Text style={styles.questionTitleText}>{question}</Text>
                        <Text style={styles.aboutPostText}>By {userName} | {date}</Text>
                        <Text style={styles.postBodyStyle}>{questionBody}</Text>

                        {
                            threadImage ? 
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Image
                                    style={{width: 200, height: 200}}
                                    source={{uri: threadImage["uri"]}}
                                />
                            </View>
                            : null
                        }
                        
                        {
                            firebase.auth().currentUser.uid === userId ? 
                            <View style={styles.discussionButtonContainerStyle}>
                                <TouchableOpacity 
                                    onPress={() => props.navigation.navigate('EditThread', {
                                        discussionKey, questionBody, question, threadImage 
                                    })}
                                    style={styles.discussionButtonTouchStyle}
                                >
                                    <Text style={styles.discussionEditButton}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => onDeletePostPress()}
                                    style={styles.discussionButtonTouchStyle}
                                >
                                    <Text style={styles.discussionDeleteButton}>Delete Thread</Text> 
                                </TouchableOpacity>
                            </View>
                            
                            : null
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
                        <TouchableOpacity 
                            onPress={() => props.navigation.navigate('AddComment', {discussionKey, question})}
                            style={styles.addCommentButtonTouchStyle}
                        >
                            <Text style={styles.addThreadButtonTextStyle}>Add comment</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
};

export default IndividualThread;