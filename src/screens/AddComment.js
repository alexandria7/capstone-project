import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AddComment extends Component {
    render() {
        return (
            <View style={styles.mainCommentPage}>
                <Text>Hey I'm a Comment</Text>
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