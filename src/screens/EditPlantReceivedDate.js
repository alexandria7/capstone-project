import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

class EditPlantReceivedDate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plantKey: this.props.navigation.getParam('plantKey'),
            dateReceived: this.props.navigation.getParam('dateReceived'),
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantKey: this.props.navigation.getParam('plantKey'),
                    dateReceived: this.props.navigation.getParam('dateReceived'),
                })
            }
        )
    }
        
    updateInfoToDatabase = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}`)
        .update({
            date_received: this.state.dateReceived
        })
        .then(() => {            
            this.props.navigation.navigate('Plant', {
                dateReceived: this.state.dateReceived,
                plantKey: this.state.plantKey
                // pass in function for rendering of firebase list here
            });
        })
    }
    
    render() {
        return (
            <View style={styles.mainEditForm}>
                <TextInput 
                    placeholder="new date"
                    value={this.state.dateReceived}
                    onChangeText={(dateReceived) => this.setState({dateReceived})}
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
        
export default EditPlantReceivedDate;