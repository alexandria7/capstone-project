import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

class Discussions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          discussions: undefined,
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

                discussions.reverse();

                this.setState({discussions})
            })
    }

    onDiscussionButtonPress = (discussion) => {
    
        this.props.navigation.navigate('IndividualThread', {
            question: discussion["question"],
            questionBody: discussion["question_body"],
            userId: discussion["userId"],
            userName: discussion["userName"],
            discussionKey: discussion["key"],
            date: discussion["date"],
            comments: discussion["comments"]
        }); 
    }
    
    render() {

        let discussionList = null;
        if (this.state.discussions) {
            discussionList = this.state.discussions.map((discussion, i) => 
                <TouchableOpacity 
                    onPress={ () => this.onDiscussionButtonPress(discussion) }
                    style={styles.discussionContainerStyle}
                    key={i}
                >
                    <Text style={styles.discussionInfoButtonStyle}>By {discussion["userName"]} | {discussion["date"]}</Text>
                    <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                    
                    {discussion["comments"] ? 
                        <Text style={styles.discussionInfoButtonStyle}>{Object.keys(discussion["comments"]).length} comment(s)</Text> :
                        <Text style={styles.discussionInfoButtonStyle}>0 Comments</Text>
                    }
                </TouchableOpacity> 
            );
        }
        

        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainDiscussionListSection}>
                    <Text style={styles.ListTitle}>All Discussions</Text>
                    <Text style={styles.subTitleStyle}>Find and offer planty advice!</Text>
                    <TouchableOpacity 
                        onPress={ () => this.props.navigation.navigate('AddDiscussionThread') }
                        style={styles.addThreadButtonTouchStyle}
                    >
                        <Text style={styles.addThreadButtonTextStyle}>Start a Thread</Text>
                    </TouchableOpacity>    
                </View>

                {
                    !this.state.discussions ? 
                    <View style={styles.loadingPlantsListStyle}>
                        <ActivityIndicator size='large'/> 
                    </View>
                    : null
                }

                {
                    this.state.discussions && this.state.discussions.length === 0 ? 
                    <Text style={styles.noticeStyleName}>No discussion threads to be found</Text> : 
                    <ScrollView style={styles.listOfDiscussionsStyle}>{discussionList}</ScrollView>
                }
            </View>
        )
    }
}

export default Discussions;