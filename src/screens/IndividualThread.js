import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CommentsList from "../components/CommentsList";

const IndividualThread = (props) => {
    // const question = props.navigation.getParam('question');
    // const questionBody = props.navigation.getParam('questionBody');
    // const userId = props.navigation.getParam('userId');
    // const userName = props.navigation.getParam('userName');
    // const discussionKey = props.navigation.getParam('discussionKey');
    // const date = props.navigation.getParam('date');
    const discussionKey = props.navigation.getParam('discussionKey');
    let question = '';
    let questionBody = '';
    let userId = '';
    let userName = '';
    let date = '';
    let comments = undefined;
    // const commentsFromDb = props.navigation.getParam('comments');
    // console.log(comments)
    firebase.database().ref(`/discussions/${discussionKey}`)
        .on('value', snapshot => {
            console.log('just the discussion key:', snapshot.val());
            const discussionObj = snapshot.val();
            question = discussionObj["question"];
            questionBody = discussionObj["question_body"];
            userId = discussionObj["userId"];
            userName = discussionObj["userName"];
            date = discussionObj["date"];
            // comments = discussionObj["comments"]
            comments = _.map(discussionObj["comments"], (commentObject, key) => {
                commentObject.key = key;
                return commentObject;
            });
        })

    // firebase.database().ref(`/discussions/${discussionKey}/comments`)
    //     .on('value', snapshot => {
    //         console.log('snapshot of all comments', snapshot.val());
    //         comments = _.map(snapshot.val(), (commentObject, key) => {
    //             commentObject.key = key;
    //             return commentObject;
    //         });
    //     })

    // const comments = _.map(commentsFromDb, (commentObject, key) => {
    //     commentObject.key = key;
    //     return commentObject;
    // });

    // const allComments = comments.map((comment, i) => 
    //     <View key={i} style={styles.commentSectionStyle}>
    //         <Text style={styles.commentUserNameStyle}>{comment["comment_user_name"]}</Text>
    //         <Text>{comment["date"]}</Text>
    //         <Text>{comment["comment"]}</Text>
    //     </View>
    // );

    const onDeletePostPress = () => {
        Alert.alert(
            `Are you sure you want to delete this thread?`,
            'All of it will be deleted including the comments.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => deletePost()}
            ]
          )
    }

    const deletePost = () => {
        console.log(`post with id ${discussionKey} is about to be deleted`)
        
        const postToDelete = firebase.database().ref(`/discussions/${discussionKey}`);

        postToDelete
            .remove()
            .then(() => {
                console.log('post was deleted...')
                props.navigation.navigate('Discussions'); 
            })
    }

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
                    {/* <View>
                        <Text style={styles.commentNumber}>{allComments.length} Comment(s)</Text>
                        {allComments.length !== 0 ? 
                            <View>{allComments}</View> :
                            <Text style={styles.noCommentsNoticeStyle}>No comments yet...</Text>
                        }
                    </View> */}
                    <View>
                        {comments.map((comment, i) => 
                            <View key={i} style={styles.commentSectionStyle}>
                            <Text style={styles.commentUserNameStyle}>{comment["comment_user_name"]}</Text>
                                <Text>{comment["date"]}</Text>
                                <Text>{comment["comment"]}</Text>
                            </View>
                        )}
                    </View>


                    <View>
                        <Button 
                            title="Add Comment"
                            onPress={() => props.navigation.navigate('AddComment', {discussionKey})}
                        />
                    </View>
                    {/* <CommentsList discussionKey={discussionKey}/> */}

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