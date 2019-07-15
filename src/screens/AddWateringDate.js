import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';

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
                // .then(() => {
                //     this.props.navigation.navigate('Plant', {
                //         wateringDates: this.state.wateringDates,
                //         plantKey: this.state.plantKey,
                //         // pass in function for rendering of firebase list here
                //     });
                // })
            this.props.navigation.navigate('Plant', {
                wateringDates: this.state.wateringDates,
                plantKey: this.state.plantKey,
                // pass in function for rendering of firebase list here
            });
        })
        .catch((error) => {
            console.log('there was an error with adding a watering date: ', error)
        })
    }

    render() {
        return (
            <View style={styles.mainEditForm}>
                <Text>Set New Watering Date for Your Plant:</Text>

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

const styles = StyleSheet.create({
    mainEditForm: {
        marginTop: 30,
    }
})

export default AddWateringDate;