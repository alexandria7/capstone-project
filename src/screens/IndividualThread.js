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
    let comments = undefined;

    firebase.database().ref(`/discussions/${discussionKey}/comments`)
        .on('value', snapshot => {
            console.log('snapshot of all comments', snapshot.val());
            comments = _.map(snapshot.val(), (commentObject, key) => {
                commentObject.key = key;
                return commentObject;
            });
        })

    const allComments = comments.map((comment, i) => 
        <View key={i}>
            <Text>{comment["comment_user_name"]}</Text>
            <Text>{comment["comment"]}</Text>
        </View>
    );

    return (
        <View style={styles.aboutAppMainStyle}>
            <View style={styles.headerStyle}>
                <View style={styles.headerNavButton}>
                    <Button
                        title='Open'
                        onPress={ () => props.navigation.openDrawer() }
                    />
                </View>
                <Text style={styles.headerText}>Wet Your Plants</Text>
            </View> 

            <View style={styles.discussionMainSectionStyle}>
                <Text style={styles.discussionHeader}>Discussion Thread</Text>
                <View style={styles.questionTitleStyle}>
                    <Text style={styles.questionTitleText}>{question}</Text>
                    <Text style={styles.aboutPostText}>Posted by {userName}</Text>
                    <Text style={styles.postBodyStyle}>{questionBody}</Text>
                </View>

                <View>
                    <Text>{allComments.length} Comments</Text>
                    {allComments.length !== 0 ? 
                        <ScrollView>{allComments}</ScrollView> :
                        <Text style={styles.noCommentsNoticeStyle}>No comments yet...</Text>
                    }
                </View>

                <View>
                    <Button 
                        title="Add a comment"
                        onPress={() => props.navigation.navigate('AddComment', {discussionKey})}
                    />
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    aboutAppMainStyle: {
        // marginTop: 20,
        flex: 1,
        backgroundColor: '#BDE1C9', 
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
    noCommentsNoticeStyle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 25
    }
});

export default IndividualThread;