import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Header from '../components/Header';
import styles from '../components/Styles';

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
              
                const allDiscussions = _.map(snapshot.val(), (discussionObject, key) => {
                    discussionObject.key = key;
                    return discussionObject;
                });

                this.setState({allDiscussions});
            })
        
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/discussionsCommented`)
            .on('value', snapshot => {
                
                const discussionsCommented = _.map(snapshot.val(), (discussionObject, key) => {
                    discussionObject.key = key;
                    return discussionObject;
                });

                this.setState({discussionsCommented});
           
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
                map.set(post["key"], true);    
                console.log('in myConvo, these are comments: ', post["comments"])
                commentedNoDups.push({
                    key: post["key"],
                    question: post["question"],
                    question_body: post["question_body"],
                    userId: post["userId"],
                    userName: post["userName"],
                    date: post["date"],
                    comments: post["comments"]
                });
            }
        }

        const writtenPosts = startedDiscussions.map((discussion, i) => 
        <TouchableOpacity 
            onPress={ () => this.onDiscussionTitlePress(discussion) }
            style={styles.convoContainerStyle}
            key={i}
        >
            <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
            <Text style={styles.discussionInfoButtonStyle}>{discussion["date"]}</Text>
        </TouchableOpacity> 
        );

        const commentedPosts = commentedNoDups.map((discussion, i) => 
            
            <TouchableOpacity 
                onPress={ () => this.onDiscussionTitlePress(discussion) }
                style={styles.convoContainerStyle}
                key={i}
            >
                <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                <Text style={styles.discussionInfoButtonStyle}>{discussion["date"]}</Text>
            </TouchableOpacity> 
        )

        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.myConvoMainStyle}>
                    
                    <Text style={styles.plantListTitle}>Your Conversations</Text>
                    
                    <ScrollView style={styles.mainConvoViewingSection}>
                        <View style={styles.convoSectionContainerStyle}>
                            <TouchableOpacity
                                onPress={() => this.onCategoryPress('written')}
                            >
                                <Text style={styles.convoSectionHeader}>Posts You've Written</Text>
                            </TouchableOpacity>

                            {this.state.writtenPostsAreVisible ?
                                <View style={styles.convoListPostSection}>
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
                                <Text style={styles.convoSectionHeader}>Posts You've Commented On</Text>
                            </TouchableOpacity>

                            {this.state.commentedPostsAreVisible ? 
                                <View style={styles.convoListPostSection}>
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

export default MyConversations;