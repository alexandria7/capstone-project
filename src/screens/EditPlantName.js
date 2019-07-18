import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

class EditPlantName extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plantKey: this.props.navigation.getParam('plantKey'),
            plantName: this.props.navigation.getParam('plantName'),
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantKey: this.props.navigation.getParam('plantKey'),
                    plantName: this.props.navigation.getParam('plantName'),
                })
            }
        )
    }

    onCancelPress = () => {
        this.props.navigation.navigate('Plant', {
            plantName: this.props.navigation.getParam('plantName'),
            plantKey: this.props.navigation.getParam('plantKey'),
        });
    }
        
    updateInfoToDatabase = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}`)
        .update({
            plant_name: this.state.plantName
        })
        .then(() => {
            
            this.props.navigation.navigate('Plant', {
                plantName: this.state.plantName,
                plantKey: this.state.plantKey
                // pass in function for rendering of firebase list here
            });
            
        })
    }
    
    render() {
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

                <View style={styles.mainEditForm}>
                    <TextInput 
                        placeholder="new plant name"
                        value={this.state.plantName}
                        onChangeText={(plantName) => this.setState({plantName})}
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
            </View>
        )
    }
}
        
const styles = StyleSheet.create({
    aboutAppMainStyle: {
        // marginTop: 20,
        flex: 1,
        backgroundColor: '#BDE1C9', 
    },
    headerStyle: {
      height: 70,
      paddingTop: 30, 
      borderColor: '#7A7E7B',
      borderBottomWidth: 0.5,
      justifyContent: 'space-around',
      backgroundColor: '#EFDECE'
    },
    headerText: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 22,
      color: '#055607',
      fontWeight: 'bold',
      paddingBottom: 40,
      paddingTop: 0
    },
    headerImageStyle: {
      width: 28, 
      height: 28,
      marginLeft: 10,
      marginTop: 10
    },
    mainEditForm: {
        marginTop: 30
    }
})
        
export default EditPlantName;