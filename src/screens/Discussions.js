import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

class Discussions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          discussions: [],
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
        this.props.navigation.navigate('IndividualThread', {
            question: discussion["question"],
            questionBody: discussion["question_body"],
            userId: discussion["userId"],
            userName: discussion["userName"]
        }); 
    }
    
    render() {
        const discussionList = this.state.discussions.map((discussion, i) => 
            <TouchableOpacity 
                onPress={ () => this.onDiscussionButtonPress(discussion) }
                key={i}
            >
                <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                <Text>By: {discussion["userName"]}</Text>
            </TouchableOpacity> 
        );

        return (
            <View>
                <View style={styles.headerStyle}>
                    <View style={styles.headerNavButton}>
                    <Button
                        title='Open'
                        onPress={ () => this.props.navigation.openDrawer() }
                    />
                    </View>
                    <Text style={styles.headerText}>Wet Your Plants</Text>
                </View>

                <View>
                    <Text>All Discussions</Text>
                    <Text>Find and offer planty advice!</Text>
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
    headerStyle: {
        height: 70,
        paddingTop: 30, 
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        justifyContent: 'space-evenly',
        // alignItems: 'center'
      },
    headerNavButton: {
        justifyContent: 'flex-end'
    },
})

export default Discussions;