import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

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
            });
        })
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>

                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Edit plant note</Text>
                    <View style={styles.textAreaContainer} >
                        <TextInput 
                            placeholder="new note"
                            multiline = {true}
                            numberOfLines = {4}
                            editable = {true}
                            value={this.state.note}
                            onChangeText={(note) => this.setState({note})}
                            clearButtonMode='always'
                            style={styles.noteTextArea}
                        />
                    </View> 

                    <View style={styles.addButtonContainerStyle}>
                        <TouchableOpacity 
                            style={styles.cancelButtonTouchStyle}
                            onPress={() => this.onCancelPress()}
                        >
                            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.addButtonTouchStyle}
                            onPress={() => this.updateInfoToDatabase()}
                        >
                            <Text style={styles.addButtonTextStyle}>Update</Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </View>
        )
    }
}

export default EditPlantNote;