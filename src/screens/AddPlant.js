import React, { Component } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
import styles from '../components/Styles';

class AddPlant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantKey: '',
      plantName: '',
      dateReceived: '',
      note: '',
    };
  }

  onAddPlantButtonPress = () => {
    if (this.state.plantName.trim() === "" ) {
      Alert.alert(
        `Error: No plant name given.`,
        'You must name your plant before it can be added to the database.',
        [
          {text: 'Ok', onPress: () => console.log('ok was pressed')}
        ]
      )
    } else {
      this.addInfoToDatabaseAndClear();
    }
  }

  addInfoToDatabaseAndClear = () => {

    const dataRef = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants`)
      .push({
        plant_name: this.state.plantName,
        date_received: this.state.dateReceived,
        note: this.state.note,
      }).key

    this.props.navigation.navigate('Plant', {
      plantName: this.state.plantName,
      receivedDate: this.state.dateReceived,
      note: this.state.note, 
      plantKey: dataRef,
    })

    this.setState({
      plantKey: '',
      plantName: '',
      dateReceived: '',
      note: '',
    });    
  }

  render() {
    return (
      <View style={styles.aboutAppMainStyle}>
        <Header drawerNav={this.props.navigation.openDrawer}/>

        <View style={styles.mainEditSectionStyle}>
        
          <View>
            <Text style={styles.editTextHeaderStyle}>Add A New Plant</Text>
          </View>

          <ScrollView>
            <View style={styles.inputSectionStyle}>
              <Text style={styles.inputTitleStyle}>Plant Name: </Text>
              <TextInput 
                placeholder="Monstera deliciosa"
                value={this.state.plantName}
                onChangeText={(plantName) => this.setState({plantName})}
                clearButtonMode='always'
              />
            </View>

            <View style={styles.inputSectionStyle}>
              <Text style={styles.inputTitleStyle}>Date Received: </Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.dateReceived}
                mode="date"
                placeholder="select date"
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

            <View style={styles.inputSectionStyle}>
              <Text style={styles.inputTitleStyle}>Add a note about this plant: </Text>
              <View style={styles.textAreaContainer} >
                <TextInput 
                  placeholder="only water when soil is completely dry"
                  multiline = {true}
                  numberOfLines = {4}
                  editable = {true}
                  value={this.state.note}
                  onChangeText={(note) => this.setState({note})}
                  clearButtonMode='always'
                  style={styles.noteTextArea}
                />
              </View>
            </View>

            <View style={styles.addButtonContainerStyle}>
              <TouchableOpacity 
                  onPress={ () => this.props.navigation.navigate('ListPlants') }
                  style={styles.cancelButtonTouchStyle}
              >
                <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
              </TouchableOpacity>  

              <TouchableOpacity 
                onPress={ () => this.onAddPlantButtonPress() }
                style={styles.addButtonTouchStyle}
              >
                <Text style={styles.addButtonTextStyle}>Add Plant</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}

export default AddPlant;