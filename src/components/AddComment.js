import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';

class AddComment extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comment: '',
        };
    }

    onSubmitCommentPress = () => {
        // const discussionKey = this.props.discussionKey;

        firebase.database().ref(`/discussions/${this.props.discussionKey}/comments`)
            .push({
                comment: this.state.comment,
                comment_user_id: firebase.auth().currentUser.uid,
                comment_user_name: firebase.auth().currentUser.displayName,
            })
            // .then(() => {
                this.props.navigation.navigate("IndividualThread", {
                    discussionKey: this.props.discussionKey,
                })

                this.setState({ comment: '' })

            // })
            // this.props.navigation.navigate('IndividualThread', {
            //     comment: this.state.comment,
            //     commentUserName: firebase.auth().currentUser.displayName
            // })

            // this.setState({ comment: '' })
    }

    render() {
        return (
            
                <View style={styles.mainCommentPage}>
                    <Text>Add Your comment:</Text>
                    <TextInput 
                        placeholder="your comment here"
                        value={this.state.comment}
                        onChangeText={(comment) => this.setState({comment})}
                        clearButtonMode='always'
                    />

                    <Button 
                        title="Submit Comment"
                        onPress={() => this.onSubmitCommentPress()}
                    />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    mainCommentPage: {
        marginTop: 30
    }
})

export default AddComment;