import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';

// import ImagePicker from 'react-native-image-picker';
// import AddPhoto from '../components/AddPhoto';

class AddPlant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantKey: '',
      plantName: '',
      dateReceived: '',
      note: '',
      wateringDates: ''
      // photos: [], 
    };
  }

  addInfoToDatabaseAndClear = () => {
    const dataRef = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants`)
      .push({
        plant_name: this.state.plantName,
        date_received: this.state.dateReceived,
        note: this.state.note,
      }).key

      console.log('the state of plantKey is', this.state.plantKey )

        console.log('the childId of this new plant is', dataRef)
        console.log('plant added to database with the name', this.state.plantName);

        this.props.navigation.navigate('Plant', {
          plantName: this.state.plantName,
          receivedDate: this.state.dateReceived,
          note: this.state.note, 
          plantKey: dataRef
          // plantKey: this.state.plantKey
        })

        console.log('about to reset the state!!!!!')
        this.setState({
          plantKey: '',
          plantName: '',
          dateReceived: '',
          note: ''
          // photos: [], 
        });
        console.log('i should have just reset my state!!!!')
    
  }

  render() {
    return (
      <View style={styles.addPlantMainStyle}>
        <Button
          title='Open'
          onPress={ () => this.props.navigation.openDrawer() }
        />

        <ScrollView style={styles.addPlantForm}>
        
          <View>
            <Text style={styles.addPlantTitle}>Add New Plant</Text>
          </View>

          <View>
            <Text>Plant Name: </Text>
            <TextInput 
              placeholder="Monstera deliciosa"
              value={this.state.plantName}
              onChangeText={(plantName) => this.setState({plantName})}
              clearButtonMode='always'
            />
          </View>

          <View>
            <Text>Date Received: </Text>
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

          <View>
            <Text>Add a note about this plant: </Text>
            <TextInput 
              placeholder="only water when soil is completely dry"
              value={this.state.value}
              onChangeText={(note) => this.setState({note})}
              clearButtonMode='always'
            />
          </View>

          <View>
            <Text>Add a photo of your plant!</Text>
            {/* <AddPhoto /> */}
          </View>

          <Button 
            title="Add Plant!"
            onPress={ () => {this.addInfoToDatabaseAndClear()} }
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  addPlantMainStyle: {
      // marginTop: 20,
      flex: 1,
      backgroundColor: '#BDE1C9', 
      // justifyContent: 'space-between'
  },
  datePickerStyle: {
    width: 200
  }
});

export default AddPlant;