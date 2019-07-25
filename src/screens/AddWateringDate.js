import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import styles from '../components/Styles';

class AddWateringDate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plantKey: this.props.navigation.getParam('plantKey'),
            wateringDates: this.props.navigation.getParam('wateringDates'),
            newWateringDate: ''
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantKey: this.props.navigation.getParam('plantKey'),
                    wateringDates: this.props.navigation.getParam('wateringDates'),
                    newWateringDate: ''
                })
            }
        )
    }

    onAddDateButtonPress = (newWateringDate) => {
       this.setState({newWateringDate})
       console.log('this was the watering date selected', this.state.newWateringDate)
    }

    onCancelPress = () => {
        this.props.navigation.navigate('Plant', {
            wateringDates: this.props.navigation.getParam('wateringDates'),
            plantKey: this.props.navigation.getParam('plantKey'),
        });
    }
        
    updateInfoToDatabase = () => {
        if (this.state.newWateringDate.trim() === "" ) {
            Alert.alert(
              `Error: No date given.`,
              'You must specify a date or press cancel.',
              [
                {text: 'Ok', onPress: () => console.log('ok was pressed')}
              ]
            )
        } else {
            this.addInfoToDatabaseAndClear();
        }
    }

    addInfoToDatabaseAndClear = () => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}/waterings`)
        .push({
            watering_date: this.state.newWateringDate
        })
        .then(() => {
            
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}/waterings`)
                .on('value', snapshot => {
                    console.log('this is what i pulled from waterings: ', snapshot.val());
                    const wateringDates = _.map(snapshot.val(), (wateringObject, key) => {
                        wateringObject.key = key;
                        return wateringObject;
                    });
            
                    this.setState({wateringDates})
                    console.log('this is the waterings list from firebase', wateringDates)
                })
                
            this.props.navigation.navigate('Plant', {
                wateringDates: this.state.wateringDates,
                plantKey: this.state.plantKey,
                
            });
        })
        .catch((error) => {
            console.log('there was an error with adding a watering date: ', error)
        })
    }


    render() {
        return (
            <View style={styles.aboutAppMainStyle}>

                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Set New Watering Date for Your Plant:</Text>

                    <View style={styles.datePickerSection}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.newWateringDate}
                            mode="date"
                            placeholder='choose date'
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
                            onDateChange={(newWateringDate) => this.onAddDateButtonPress(newWateringDate)}
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

export default AddWateringDate;