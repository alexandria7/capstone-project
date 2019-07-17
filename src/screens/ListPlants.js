import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Plant from './Plant';
// import { FlatList } from 'react-native-gesture-handler';

class ListPlants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plants: [],
      // selectedPlant: null
    }
  }

  // look into changing this rendering 
  componentDidMount () {
    this.getPlantListFromFireBase();
  }

  getPlantListFromFireBase = () => {
    console.log('plant list incoming...');

    const currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${currentUser}/plants`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        const plants = _.map(snapshot.val(), (plantObject, key) => {
          plantObject.key = key;
          return plantObject;
        });

        this.setState({plants})
        console.log('this is the plants list from firebase', plants)
      })
  }

  onPlantNameButtonPress = (plant) => {
    console.log('this is the selected plant:', plant["plant_name"]);

    const wateringList = _.map(plant["waterings"], (wateringObject, key) => {
      wateringObject.key = key;
      return wateringObject;
    });

    const fertilizingList = _.map(plant["fertilizings"], (fertilizingObject, key) => {
      fertilizingObject.key = key;
      return fertilizingObject;
    });

    this.props.navigation.navigate('Plant', {
      plantName: plant["plant_name"],
      dateReceived: plant["date_received"],
      note: plant["note"],
      plantKey: plant["key"],
      wateringDates: wateringList,
      fertilizingDates: fertilizingList
      // pass in function for rendering of firebase list here
    }); 

  }

  render() {

    const plantList = this.state.plants.map((plant, i) => 
      <TouchableOpacity 
        onPress={ () => this.onPlantNameButtonPress(plant) }
        style={styles.plantContainerStyle}
        key={i}
      >
        <Text style={styles.plantNameButtonStyle}>{plant["plant_name"]}</Text>
      </TouchableOpacity> 
    );

    return (
        <View style={styles.aboutAppMainStyle}>
          <View style={styles.headerStyle}>

            <View style={styles.headerNavButton}>
              <Button
                title='Open'
                onPress={ () => this.props.navigation.openDrawer() }
              />
            </View>
            <Text style={styles.headerText}>Wet Your Plants</Text>

          </View>

          <View style={styles.mainPlantListSection}>

            <Text style={styles.plantListTitle}>Your Plants</Text>

            <Button 
                title="Add Plant"
                onPress={ () => this.props.navigation.navigate('AddPlant') }
            />

            {
              this.state.plants.length === 0 ? 
              <Text style={styles.noticeStyleName}>You have not added any plants!</Text> : 
              <ScrollView style={styles.listOfPlantsStyle}>{plantList}</ScrollView>
            }


          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  aboutAppMainStyle: {
      // marginTop: 20,
      flex: 1,
      backgroundColor: '#BDE1C9', 
  },
  headerStyle: {
    height: 70,
    paddingTop: 30, 
    borderColor: 'lightgrey',
    borderBottomWidth: 0.5,
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  headerText: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  headerNavButton: {
    justifyContent: 'flex-end'
  },
  mainPlantListSection: {
    paddingTop: 20,
    flex: 1
  },
  plantListTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#055607',
    textAlign: 'center',
  },
  listOfPlantsStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    // flex: 1
  },
  noticeStyleName : {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 25
  },
  plantNameButtonStyle: {
    fontSize: 20,
    // paddingBottom: 10
  },
  plantContainerStyle: {
    borderColor: '#7A7E7B',
    borderBottomWidth: 0.5,
    paddingTop: 10, 
    paddingBottom: 10
  }
});

export default ListPlants;