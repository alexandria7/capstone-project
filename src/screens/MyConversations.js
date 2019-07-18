import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';

class MyConversations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            discussions: []
        }
    }

    componentDidMount() {
        this.getDiscussionsFromFirebase();
    }

    getDiscussionsFromFirebase = () => {
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

    onPostQuestionPress = (discussion) => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: discussion["key"],
            question: discussion["question"],
            questionBody: discussion["question_body"],
            userId: discussion["userId"],
            userName: discussion["userName"]
        })
    }


    render() {
        const startedDiscussions = [];

        this.state.discussions.forEach((post) => {
            if (post["userId"] === firebase.auth().currentUser.uid) {
                startedDiscussions.push(post)
            }
        })

        const writtenPosts = startedDiscussions.map((discussion, i) => 
        <TouchableOpacity 
            onPress={ () => this.onPostQuestionPress(discussion) }
            style={styles.discussionContainerStyle}
            key={i}
        >
            <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
    
        </TouchableOpacity> 
        );

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

                <View style={styles.mainPageSection}>
                    <Text style={styles.mainTitleStyle}>Your Conversations</Text>

                    <ScrollView style={styles.mainPostViewingSection}>
                        <View>
                            <Text style={styles.postSectionHeader}>Posts You've Written</Text>
                            {/* { this.state.allDiscussions.length !== 0 ? 
                                {writtenPosts} :
                                <Text>You haven't written any posts yet.</Text>
                            } */}
                            {
                                startedDiscussions.length === 0 ? 
                                <Text style={styles.noticeStyleName}>No discussion threads to be found</Text> : 
                                <View style={styles.listOfDiscussionsStyle}>{writtenPosts}</View>
                            }
                        </View>

                        <View>
                            <Text style={styles.postSectionHeader}>Posts You've Commented On</Text>
                        </View>
                    </ScrollView>
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
    mainPageSection: {
        paddingTop: 20,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    mainTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#055607',
        textAlign: 'center',
    },
    mainPostViewingSection: {
        paddingTop: 15
    },
    postSectionHeader: {
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default MyConversations;