import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

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
          <Header drawerNav={this.props.navigation.openDrawer}/>
          
          <View style={styles.mainPlantListSection}>

            <Text style={styles.plantListTitle}>Your Plants</Text>

            <TouchableOpacity 
                onPress={ () => this.props.navigation.navigate('AddPlant') }
                style={styles.bigButtonTouchStyle}
            >
              <Text style={styles.bigButtonTextStyle}>Add Plant</Text>
            </TouchableOpacity>
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

export default ListPlants;