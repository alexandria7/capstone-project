import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';

class MyConversations extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            allDiscussions: [],
            discussionsCommented: [],
            writtenPostsAreVisible: false,
            commentedPostsAreVisible: false
        }
    }

    componentDidMount() {
        this.getDiscussionsFromFirebase();
    }

    getDiscussionsFromFirebase = () => {
        firebase.database().ref(`/discussions`)
            .on('value', snapshot => {
                // console.log(snapshot.val());
                const allDiscussions = _.map(snapshot.val(), (discussionObject, key) => {
                    discussionObject.key = key;
                    return discussionObject;
                });

                this.setState({allDiscussions});
                // console.log('this is the discussions list from firebase', discussions)
            })
        
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`)
            .on('value', snapshot => {
                // console.log(snapshot.val());
                const discussionsCommented = _.map(snapshot.val(), (discussionObject, key) => {
                    discussionObject.key = key;
                    return discussionObject;
                });

                this.setState({discussionsCommented});
                // console.log(discussionsCommented)
            })
    }

    onCategoryPress = (category) => {
        if (category === 'written') {
            this.setState({writtenPostsAreVisible: !this.state.writtenPostsAreVisible})
        } else if (category === 'commented') {
            this.setState({commentedPostsAreVisible: !this.state.commentedPostsAreVisible})
        }
    }

    onDiscussionTitlePress = (discussion) => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: discussion["key"],
            question: discussion["question"],
            questionBody: discussion["question_body"],
            userId: discussion["userId"],
            userName: discussion["userName"],
            date: discussion["date"],
            comments: discussion["comments"]
        })
    }


    render() {
        const startedDiscussions = [];
        const commentedDiscussions = [];

        this.state.allDiscussions.forEach((post) => {
            // console.log('this is a post...', post)
            if (post["userId"] === firebase.auth().currentUser.uid) {
                startedDiscussions.push(post)
            }
        });

        this.state.allDiscussions.forEach((post) => {
            this.state.discussionsCommented.forEach((discussion) => {
                if (post["key"] === discussion["id"]) {
                    commentedDiscussions.push(post)
                }
            })
        })

        const commentedNoDups = [];
        const map = new Map();
        for (const post of commentedDiscussions) {
            if(!map.has(post["key"])){
                map.set(post["key"], true);    // set any value to Map
                commentedNoDups.push({
                    discussionKey: post["key"],
                    question: post["question"],
                    questionBody: post["question_body"],
                    userId: post["userId"],
                    userName: post["userName"],
                    date: post["date"],
                    comments: post["comments"]
                });
            }
        }

        console.log('the commented discussions are: ', commentedDiscussions)
        console.log('the commented discussions without dups are, ', commentedNoDups)

        const writtenPosts = startedDiscussions.map((discussion, i) => 
        <TouchableOpacity 
            onPress={ () => this.onDiscussionTitlePress(discussion) }
            style={styles.discussionContainerStyle}
            key={i}
        >
            <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
            <Text style={styles.discussionDateButtonStyle}>{discussion["date"]}</Text>
        </TouchableOpacity> 
        );

        const commentedPosts = commentedNoDups.map((discussion, i) => 
            <TouchableOpacity 
                onPress={ () => this.onDiscussionTitlePress(discussion) }
                style={styles.discussionContainerStyle}
                key={i}
            >
                <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                <Text style={styles.discussionDateButtonStyle}>{discussion["date"]}</Text>
            </TouchableOpacity> 
        )

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
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress('written')}
                            >
                                <Text style={styles.postSectionHeader}>Posts You've Written</Text>
                            </TouchableOpacity>

                            {this.state.writtenPostsAreVisible ?
                                <View style={styles.listPostsSection}>
                                    {
                                        startedDiscussions.length === 0 ? 
                                        <Text style={styles.noticeStyleName}>No discussion threads to be found</Text> : 
                                        <View style={styles.listOfDiscussionsStyle}>{writtenPosts}</View>
                                    }
                                </View> : null
                            }
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress('commented')}
                            >
                                <Text style={styles.postSectionHeader}>Posts You've Commented On</Text>
                            </TouchableOpacity>

                            {this.state.commentedPostsAreVisible ? 
                                <View style={styles.listPostsSection}>
                                    {
                                        commentedDiscussions.length === 0 ?
                                        <Text style={styles.noticeStyleName}>No discussion threads to be found</Text> : 
                                        <View style={styles.listOfDiscussionsStyle}>{commentedPosts}</View>
                                    }
                                </View> : null
                            }
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
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#ADADAD',
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: 'black',
        borderWidth: 0.5
    },
    listPostsSection: {
        paddingTop: 10, 
        paddingBottom: 10
    },
    discussionContainerStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10
    },
    discussionDateButtonStyle: {
        paddingLeft: 5,
        fontStyle: 'italic'
    }
})

export default MyConversations;