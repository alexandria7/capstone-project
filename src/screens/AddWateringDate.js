import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';
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

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Set New Watering Date for Your Plant:</Text>

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

export default AddWateringDate;