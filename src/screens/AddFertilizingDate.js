import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
            <View style={styles.aboutAppMainStyle}>

                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Set New Fertilizing Date for Your Plant:</Text>

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
//     mainEditForm: {
//         marginTop: 30,
//     }
// })

export default AddFertilizingDate;