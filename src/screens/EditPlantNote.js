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
                // pass in function for rendering of firebase list here
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

                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.onCancelPress()}
                        />

                        <Button 
                            title="Update"
                            onPress={() => this.updateInfoToDatabase()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     aboutAppMainStyle: {
//         // marginTop: 20,
//         flex: 1,
//         backgroundColor: '#BDE1C9', 
//     },
//     headerStyle: {
//       height: 70,
//       paddingTop: 30, 
//       borderColor: '#7A7E7B',
//       borderBottomWidth: 0.5,
//       justifyContent: 'space-around',
//       backgroundColor: '#EFDECE'
//     },
//     headerText: {
//       alignSelf: 'center',
//       textAlign: 'center',
//       fontSize: 22,
//       color: '#055607',
//       fontWeight: 'bold',
//       paddingBottom: 40,
//       paddingTop: 0
//     },
//     headerImageStyle: {
//       width: 28, 
//       height: 28,
//       marginLeft: 10,
//       marginTop: 10
//     },
//     mainEditSectionStyle: {
//         paddingTop: 20,
//         flex: 1,
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     editTextHeaderStyle: {
//         fontSize: 35,
//         fontWeight: 'bold',
//         color: '#055607',
//         textAlign: 'center',
//         marginBottom: 20
//     },
//     noteTextArea: {
//         height: 100,
//         justifyContent: "flex-start"
//     },
//     textAreaContainer: {
//         borderWidth: 0.5,
//     },
//     buttonContainer: {
//         marginTop: 20
//     }
// })

export default EditPlantNote;