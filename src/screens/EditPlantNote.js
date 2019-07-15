import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

class EditPlantNote extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plantKey: this.props.navigation.getParam('plantKey'),
            note: this.props.navigation.getParam('note'),
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantKey: this.props.navigation.getParam('plantKey'),
                    note: this.props.navigation.getParam('note'),
                })
            }
        )
    }

    onCancelPress = () => {
        this.props.navigation.navigate('Plant', {
            note: this.props.navigation.getParam('note'),
            plantKey: this.props.navigation.getParam('plantKey'),
        });
    }

    updateInfoToDatabase = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}`)
        .update({
            note: this.state.note
        })
        .then(() => {
        
            this.props.navigation.navigate('Plant', {
                dateReceived: this.state.dateReceived,
                plantKey: this.state.plantKey,
                note: this.state.note
                // pass in function for rendering of firebase list here
            });
        })
    }

    render() {
        return (
            <View>
                <Text>Add a New Note About this plant!</Text>
                <TextInput 
                    placeholder="new note"
                    value={this.state.note}
                    onChangeText={(note) => this.setState({note})}
                    clearButtonMode='always'
                />

                <Button 
                    title="Cancel"
                    onPress={() => this.onCancelPress()}
                />

                <Button 
                    title="Update"
                    onPress={() => this.updateInfoToDatabase()}
                />
            </View>
        )
    }
}

export default EditPlantNote;