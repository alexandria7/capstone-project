import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import styles from '../components/Styles';

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

    onCancelPress = () => {
        this.props.navigation.navigate('Plant', {
            dateReceived: this.props.navigation.getParam('dateReceived'),
            plantKey: this.props.navigation.getParam('plantKey'),
        });
    }
        
    updateInfoToDatabase = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}`)
        .update({
            date_received: this.state.dateReceived
        })
        .then(() => {            
            this.props.navigation.navigate('Plant', {
                dateReceived: this.state.dateReceived,
                plantKey: this.state.plantKey,
            });
        })
    }
    
    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Update the date you received this plant!</Text>
                    
                    <View style={styles.datePickerSection}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.dateReceived}
                            mode="date"
                            placeholder={`${this.state.dateReceived}`}
                            format="MMMM Do YYYY"
                            minDate="1980-01-01"
                            maxDate="2050-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            onDateChange={(dateReceived) => this.setState({dateReceived})}
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
        
export default EditPlantReceivedDate;