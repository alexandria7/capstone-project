import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, TouchableOpacity, Image, TextInput } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

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

    onEditPlantButtonPress = () => {
        if (this.state.plantName.trim() === "" ) {
          Alert.alert(
            `Error: No plant name given.`,
            'Plants cannot be nameless in our database.',
            [
              {text: 'Ok', onPress: () => console.log('ok was pressed')}
            ]
          )
        } else {
          this.updateInfoToDatabase();
        }
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
            });
            
        })
    }
    
    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>

                    <Text style={styles.editTextHeaderStyle}>Edit plant name</Text>

                    <TextInput 
                        placeholder="new plant name"
                        value={this.state.plantName}
                        onChangeText={(plantName) => this.setState({plantName})}
                        clearButtonMode='always'
                        style={styles.editInputTextSection}
                    />

                    <View style={styles.addButtonContainerStyle}>
                        <TouchableOpacity 
                            style={styles.cancelButtonTouchStyle}
                            onPress={() => this.onCancelPress()}
                        >
                            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.addButtonTouchStyle}
                            onPress={() => this.onEditPlantButtonPress()}
                        >
                            <Text style={styles.addButtonTextStyle}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
        
export default EditPlantName;