import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

class Discussions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          discussions: [],
          comments: []
        }
    }

    componentDidMount () {
        this.getDiscussionListFromFirebase();
    }
    
    getDiscussionListFromFirebase = () => {
        console.log('discussion list incoming...');

        firebase.database().ref(`/discussions`)
            .on('value', snapshot => {
                console.log(snapshot.val());
                const discussions = _.map(snapshot.val(), (discussionObject, key) => {
                    discussionObject.key = key;
                    return discussionObject;
                });

                this.setState({discussions})
                console.log('this is the discussions list from firebase', discussions)
            })
    }

    onDiscussionButtonPress = (discussion) => {
        // firebase.database().ref(`/discussions/${discussion["key"]}/comments`)
        //     .on('value', snapshot => {
        //         console.log('snapshot of all comments', snapshot.val());
        //         const comments = _.map(snapshot.val(), (commentObject, key) => {
        //             commentObject.key = key;
        //             return commentObject;
        //         });

        //         console.log('this is the comments array as a result of mapping', comments)
        //         this.setState({comments})
        //     })

        // const commentsList = _.map(discussion["comments"], (commentObject, key) => {
        //     commentObject.key = key;
        //     return commentObject;
        // });

        this.props.navigation.navigate('IndividualThread', {
            question: discussion["question"],
            questionBody: discussion["question_body"],
            userId: discussion["userId"],
            userName: discussion["userName"],
            discussionKey: discussion["key"],
            // comments: commentsList
        }); 
    }
    
    render() {
        const discussionList = this.state.discussions.map((discussion, i) => 
            <TouchableOpacity 
                onPress={ () => this.onDiscussionButtonPress(discussion) }
                style={styles.discussionContainerStyle}
                key={i}
            >
                <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                <Text>By: {discussion["userName"]}</Text>
            </TouchableOpacity> 
        );

        return (
            <View style={styles.aboutAppMainStyle}>
                <View style={styles.headerStyle}>
                    <View style={styles.headerNavButton}>
                    <Button
                        title='Open'
                        onPress={ () => this.props.navigation.openDrawer() }
                    />
                    </View>
                    <Text style={styles.headerText}>Wet Your Plants</Text>
                </View>

                <View style={styles.mainDiscussionListSection}>
                    <Text style={styles.ListTitle}>All Discussions</Text>
                    <Text style={styles.subTitleStyle}>Find and offer planty advice!</Text>
                    <Button 
                        title="Start a Thread"
                        onPress={ () => this.props.navigation.navigate('AddDiscussionThread') }
                    />
                </View>

                {
                    this.state.discussions.length === 0 ? 
                    <Text style={styles.noticeStyleName}>No discussion threads to be found</Text> : 
                    <ScrollView style={styles.listOfDiscussionsStyle}>{discussionList}</ScrollView>
                }
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
      borderColor: 'lightgrey',
      borderBottomWidth: 0.5,
      justifyContent: 'space-evenly',
      // alignItems: 'center'
    },
    headerText: {
      alignSelf: 'center',
      textAlign: 'center'
    },
    subTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#7A7E7B',
        fontSize: 20,
        marginBottom: 20
    },
    headerNavButton: {
      justifyContent: 'flex-end'
    },
    mainDiscussionListSection: {
      paddingTop: 20,
    //   flex: 1
    },
    ListTitle: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#055607',
      textAlign: 'center',
    },
    listOfDiscussionsStyle: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15,
      // flex: 1
    },
    noticeStyleName : {
      fontWeight: 'bold',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 25
    },
    discussionNameButtonStyle: {
      fontSize: 20,
      paddingBottom: 10
    },
    discussionContainerStyle: {
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        paddingTop: 10, 
        paddingBottom: 10
    }
  });

export default Discussions;