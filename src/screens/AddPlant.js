import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import firebase from 'firebase';

class AddPlant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantName: '',
      dateReceived: '',
      notes: [],
      // photos: [], 
    };
  }

  addInfoToDatabase = () => {
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants`)
      .push({
        plant_name: this.state.plantName,
        date_received: this.state.dateReceived,
        notes: this.state.notes,
      })
      .then(() => {
        console.log('plant added to database!');

        this.props.navigation.navigate('Plant', {
          plantName: this.state.plantName,
          receivedDate: this.state.dateReceived,
          notes: this.state.notes
          // pass in function for rendering of firebase list here
        })
        
        this.setState = {
          plantName: '',
          dateReceived: '',
          notes: [],
          // photos: [], 
        };
        // this.props.navigation.navigate('ListPlants');

      });
    
  }

  render() {
    return (
      <View style={styles.addPlantMainStyle}>
        <Button
          title='Open'
          onPress={ () => this.props.navigation.openDrawer() }
        />
        
        <View>
          <Text style={styles.addPlantTitle}>Add New Plant</Text>
        </View>

        <View>
          <Text>Plant Name: </Text>
          <TextInput 
            placeholder="Monstera deliciosa"
            value={this.state.plantName}
            onChangeText={(plantName) => this.setState({plantName})}
          />
        </View>

        <View>
          <Text>Date Received: </Text>
          <TextInput 
            placeholder="June 28, 2019"
            value={this.state.dateReceived}
            onChangeText={(dateReceived) => this.setState({dateReceived})}
          />
        </View>

        <View>
          <Text>Add a note about this plant: </Text>
          <TextInput 
            placeholder="only water when soil is completely dry"
            value={this.state.value}
            onChangeText={(note) => this.setState({notes: [note]})}
          />
        </View>

        <Button 
          title="Add Plant!"
          onPress={ this.addInfoToDatabase }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  addPlantMainStyle: {
      // marginTop: 20,
      flex: 1,
      backgroundColor: '#BDE1C9', 
  },
  addPlantTitle: {

  }
});

export default AddPlant;