import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import firebase from 'firebase';

class CommentsList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // discussionKey: this.props.discussionKey,
            comments: [],
            newComment: '',
            // discussionKey: this.props.discussionKey
          // selectedPlant: null
        }

        // this.props.navigation.addListener(
        //     'willFocus',
        //     () => {
        //         this.setState({
        //             comments: [],
        //             newComment: '',
        //             discussionKey: this.props.discussionKey
        //         })
        //     }
        // )
    }

    componentDidMount() {
        this.getCommentsFromFireBase();
    }

    getCommentsFromFireBase = () => {
        firebase.database().ref(`/discussions/${this.props.discussionKey}/comments`)
        .on('value', snapshot => {
            console.log('snapshot of all comments', snapshot.val());
            const comments = _.map(snapshot.val(), (commentObject, key) => {
                commentObject.key = key;
                return commentObject;
            });

            this.setState({comments});
        })
    }

    // onSubmitCommentPress = () => {
    //     const currentComment = this.state.newComment;
    //     let currentCommentList = this.state.comments;
    //     const todaysDate = (new Date()).toDateString();

    //     let newCommentObject = {
    //         comment: currentComment,
    //         comment_user_id: firebase.auth().currentUser.uid,
    //         comment_user_name: firebase.auth().currentUser.displayName,
    //         date: todaysDate
    //     }

    //     currentCommentList.push(newCommentObject);

    //     this.setState({comments: currentCommentList});

    //     firebase.database().ref(`/discussions/${this.props.discussionKey}/comments`)
    //         .push({
    //             comment: currentComment,
    //             comment_user_id: firebase.auth().currentUser.uid,
    //             comment_user_name: firebase.auth().currentUser.displayName,
    //             date: todaysDate
    //         })
    //         .then(() => {
    //             this.setState({
    //                 comments: [],
    //                 newComment: ''
    //             })
    //         })
    // }
    
    render() {

        const allComments = this.state.comments.map((comment, i) => 
            <View key={i} style={styles.commentSectionStyle}>
                <Text style={styles.commentUserNameStyle}>{comment["comment_user_name"]}</Text>
                <Text>{comment["date"]}</Text>
                <Text>{comment["comment"]}</Text>
            </View>
        );

        return (
            <View>
                <View>
                    <Text style={styles.commentNumber}>{allComments.length} Comment(s)</Text>
                    {allComments.length !== 0 ? 
                        <View>{allComments}</View> :
                        <Text style={styles.noCommentsNoticeStyle}>No comments yet...</Text>
                    }
                </View>

                <View>
                    {/* <TextInput 
                        placeholder="your comment here"
                        value={this.state.newComment}
                        onChangeText={(newComment) => this.setState({newComment})}
                        clearButtonMode='always'
                    /> */}

                    <Button 
                        title="Add Comment"
                        onPress={() => this.props.navigation.navigate('AddComment', {discussionKey: this.props.discussionKey})}
                    />
                </View>
                {/* <View>
                    <Button 
                        title="Add Comment"
                        onPress={() => this.props.navigation.navigate('AddComment', {this.props.discussionKey})}
                    />
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
})

export default CommentsList;