import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from '../components/Styles';

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
        const discussionList = this.state.discussions.map((discussion, i) => 
            <TouchableOpacity 
                onPress={ () => this.onDiscussionButtonPress(discussion) }
                style={styles.discussionContainerStyle}
                key={i}
            >
                <Text style={styles.discussionNameButtonStyle}>{discussion["question"]}</Text>
                <Text>{discussion["date"]}</Text>
                <Text>By: {discussion["userName"]}</Text>
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

// const styles = StyleSheet.create({
    // aboutAppMainStyle: {
    //     // marginTop: 20,
    //     flex: 1,
    //     backgroundColor: '#BDE1C9', 
    // },
    // headerStyle: {
    //     height: 70,
    //     paddingTop: 30, 
    //     borderColor: '#7A7E7B',
    //     borderBottomWidth: 0.5,
    //     justifyContent: 'space-around',
    //     backgroundColor: '#EFDECE'
    // },
    // headerText: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     fontSize: 22,
    //     color: '#055607',
    //     fontWeight: 'bold',
    //     paddingBottom: 40,
    //     paddingTop: 0
    // },
    // headerImageStyle: {
    //     width: 28, 
    //     height: 28,
    //     marginLeft: 10,
    //     marginTop: 10
    // },
    // subTitleStyle: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     fontWeight: 'bold',
    //     color: '#7A7E7B',
    //     fontSize: 20,
    //     marginBottom: 20
    // },
    // headerNavButton: {
    //   justifyContent: 'flex-end'
    // },
    // mainDiscussionListSection: {
    //   paddingTop: 20,
    // //   flex: 1
    // },
    // ListTitle: {
    //   fontSize: 35,
    //   fontWeight: 'bold',
    //   color: '#055607',
    //   textAlign: 'center',
    // },
    // listOfDiscussionsStyle: {
    //   marginLeft: 15,
    //   marginRight: 15,
    //   marginTop: 15,
    //   // flex: 1
    // },
    // noticeStyleName : {
    //   fontWeight: 'bold',
    //   fontStyle: 'italic',
    //   textAlign: 'center',
    //   marginTop: 25
    // },
    // discussionNameButtonStyle: {
    //   fontSize: 20,
    //   paddingBottom: 10
    // },
    // discussionContainerStyle: {
    //     borderColor: '#7A7E7B',
    //     borderBottomWidth: 0.5,
    //     paddingTop: 10, 
    //     paddingBottom: 10
    // }
//   });

export default Discussions;