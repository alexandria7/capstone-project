import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

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
    borderColor: '#7A7E7B',
    borderBottomWidth: 0.5,
    justifyContent: 'space-around',
    backgroundColor: '#EFDECE'
  },
  headerText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 22,
    color: '#055607',
    fontWeight: 'bold',
    paddingBottom: 40,
    paddingTop: 0
  },
  headerImageStyle: {
    width: 28, 
    height: 28,
    marginLeft: 10,
    marginTop: 10
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