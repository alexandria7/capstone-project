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
                // pass in function for rendering of firebase list here
            });
        })
    }
    
    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <Header drawerNav={this.props.navigation.openDrawer}/>

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Update the date you received this plant!</Text>
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
                    
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.onCancelPress()}
                        />

                        <Button 
                            title="Update Date"
                            onPress={() => this.updateInfoToDatabase()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
        
// const styles = StyleSheet.create({
    // aboutAppMainStyle: {
    //     // marginTop: 20,
    //     flex: 1,
    //     backgroundColor: '#BDE1C9', 
    // },
    // headerStyle: {
    //   height: 70,
    //   paddingTop: 30, 
    //   borderColor: '#7A7E7B',
    //   borderBottomWidth: 0.5,
    //   justifyContent: 'space-around',
    //   backgroundColor: '#EFDECE'
    // },
    // headerText: {
    //   alignSelf: 'center',
    //   textAlign: 'center',
    //   fontSize: 22,
    //   color: '#055607',
    //   fontWeight: 'bold',
    //   paddingBottom: 40,
    //   paddingTop: 0
    // },
    // headerImageStyle: {
    //   width: 28, 
    //   height: 28,
    //   marginLeft: 10,
    //   marginTop: 10
    // },
//     mainEditForm: {
//         marginTop: 30
//     }
// })
        
export default EditPlantReceivedDate;