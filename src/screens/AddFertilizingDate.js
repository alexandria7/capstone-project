import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';

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
                
            this.props.navigation.navigate('Plant', {
                fertilizingDates: this.state.fertilizingDates,
                plantKey: this.state.plantKey,
                // pass in function for rendering of firebase list here
            });
        })
        .catch((error) => {
            console.log('there was an error with adding a fertilizing date: ', error)
        })
    }

    render() {
        return (
            <View style={styles.mainEditForm}>
                <Text>Set New Fertilizing Date for Your Plant:</Text>

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

export default AddFertilizingDate;