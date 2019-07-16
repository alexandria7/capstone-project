import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const IndividualThread = (props) => {
    const question = props.navigation.getParam('question');
    const questionBody = props.navigation.getParam('questionBody');
    const userId = props.navigation.getParam('userId');
    const userName = props.navigation.getParam('userName');

    return (
        <View>
            <Text style={{marginTop: 50}}>{question}</Text>
            <Text>{questionBody}</Text>
            <Text>Asked by {userName}</Text>
        </View>
    )
}

export default IndividualThread;