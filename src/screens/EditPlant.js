import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, TextInput, StyleSheet } from 'react-native';

class EditPlant extends Component {
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
                <View style={styles.mainEditForm}>
                <TextInput 
                placeholder="new plant name"
                value={this.state.plantName}
                onChangeText={(plantName) => this.setState({plantName})}
                clearButtonMode='always'
                />
                
                <Button 
                title="Update"
                onPress={() => this.updateInfoToDatabase()}
                />
                </View>
                )
            }
        }
        
        const styles = StyleSheet.create({
            mainEditForm: {
                marginTop: 30
            }
        })
        
        export default EditPlant;