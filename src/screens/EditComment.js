import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, Button } from 'react-native';

class EditComment extends Component {
    render() {
        return (
            <View style={{marginTop: 50}}>
                <Text>Edit page</Text>
                <Text>the discussion thread has the key: ${this.props.navigation.getParam('discussionKey')}</Text>
                <Text>the comment was: ${this.props.navigation.getParam('comment')}</Text>
            </View>
        )
    }
}

export default EditComment;