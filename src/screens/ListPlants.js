import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Plant from './Plant';
// import { FlatList } from 'react-native-gesture-handler';

class ListPlants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plants: []
    }
  }

  componentDidMount () {
    this.getPlantListFromFireBase();
  }

  getPlantListFromFireBase() {
    console.log('plant list incoming...');

    const currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${currentUser}/plants`)
      .on('value', snapshot => {
        const plants = _.map(snapshot.val(), (uid) => {
          return uid;
        });

        this.setState({plants})
        console.log('this is the plants list from firebase', plants)
      })

      console.log('this is the state', this.state.plants)
  }

  onPlantNameButtonPress() {
    this.props.navigation.navigate('AboutApp')

  }

  render() {

    let notice = '';
    let noticeStyleName = 'hasPlantsMessage';

    if (this.state.plants.length === 0) {
      notice = 'You have not added any plants!';
      noticeStyleName = 'noPlantsMessage';
    };

  const allPlants = this.state.plants.map((plant, i) => 
    // <Text key={i}>{plant["plant_name"]}</Text>
    <TouchableOpacity 
      onPress={ () => this.onPlantNameButtonPress() }
      key={i}
    >
      <Text>{plant["plant_name"]}</Text>
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

          <View style={styles.listOfPlantsStyle}>
            {allPlants}

          {/* <FlatList
            data={this.state.plants}
            renderItem={({plant}) => <Text style={{width: 40, height: 30}}>{plant}</Text>}
            keyExtractor={index => index}
            style={{
              flex: 1
            }}
          /> */}

          {/* <View> */}
            {/* {allPlants} */}
          {/* </View> */}


            {/* <FlatList
              data={this.state.plants}
              renderItem={({plant, i}) => <Text key={i}>{plant}</Text>}
              keyExtractor={i => i}
            /> */}
          </View>

          <Text style={this.noticeStyleName}>{notice}</Text>
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
    paddingTop: 20
  },
  plantListTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#055607',
    textAlign: 'center',
  },
  listOfPlantsStyle: {
    marginLeft: 15,
    marginTop: 15
  }
});

export default ListPlants;