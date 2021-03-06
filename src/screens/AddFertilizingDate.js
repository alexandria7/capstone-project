import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import styles from '../components/Styles';

class AddFertilizingDate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plantKey: this.props.navigation.getParam('plantKey'),
            fertilizingDates: this.props.navigation.getParam('fertilizingDates'),
            newFertilizingDate: ''
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    plantKey: this.props.navigation.getParam('plantKey'),
                    fertilizingDates: this.props.navigation.getParam('fertilizingDates'),
                    newFertilizingDate: ''
                })
            }
        )
    }

    onAddDateButtonPress = (newFertilizingDate) => {
       this.setState({newFertilizingDate})
       console.log('this was the fertilizing date selected', this.state.newFertilizingDate)
    }

    onCancelPress = () => {
        this.props.navigation.navigate('Plant', {
            fertilizingDates: this.props.navigation.getParam('fertilizingDates'),
            plantKey: this.props.navigation.getParam('plantKey'),
        });
    }
        
    updateInfoToDatabase = () => {
        if (this.state.newFertilizingDate.trim() === "" ) {
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
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}/fertilizings`)
        .push({
            fertilizing_date: this.state.newFertilizingDate
        })
        .then(() => {
            
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${this.state.plantKey}/fertilizings`)
                .on('value', snapshot => {
                    console.log('this is what i pulled from fertilizings: ', snapshot.val());
                    const fertilizingDates = _.map(snapshot.val(), (fertilizeObject, key) => {
                        fertilizeObject.key = key;
                        return fertilizeObject;
                    });
            
                    this.setState({fertilizingDates})
                    console.log('this is the fertilizings list from firebase', fertilizingDates)
                })

            Alert.alert(
                `Succesfully added new fertilizing date.`,
                'Good job!',
                [
                    {text: 'Ok', onPress: console.log('ok was pressed')}
                ]
            )
                
            this.props.navigation.navigate('Plant', {
                fertilizingDates: this.state.fertilizingDates,
                plantKey: this.state.plantKey,
            });
        })
        .catch((error) => {
            console.log('there was an error with adding a fertilizing date: ', error)
        })
    }

    render() {
        return (
            <View style={styles.aboutAppMainStyle}>

                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Set New Fertilizing Date for Your Plant:</Text>

                    <View style={styles.datePickerSection}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.newFertilizingDate}
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
                            onDateChange={(newFertilizingDate) => this.onAddDateButtonPress(newFertilizingDate)}
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

export default AddFertilizingDate;