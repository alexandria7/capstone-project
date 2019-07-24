import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '../components/Styles';
import Header from '../components/Header';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    // const plantImage = props.navigation.getParam('plantImage');
    const dateReceived = props.navigation.getParam('dateReceived');
    const note = props.navigation.getParam('note');
    const plantKey = props.navigation.getParam('plantKey');
    console.log(plantKey)
    const wateringDates = props.navigation.getParam('wateringDates');
    console.log(wateringDates)
    const fertilizingDates = props.navigation.getParam('fertilizingDates');
    let plantImage = undefined;

    console.log('image link works?: ', firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/image`))
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/image`)
        .on('value', snapshot => {
            console.log('snapshot of image object', snapshot.val());
            // console.log('snapshot of image uri: ', snapshot.val()["uri"])
            if (snapshot.val() !== null) {
                plantImage = snapshot.val();
            }
        })
        

    const onEditNamePress = () => {
        props.navigation.navigate('EditPlantName', {
            plantKey: plantKey,
            plantName: plantName
        })
    };

    const onEditDatePress = () => {
        props.navigation.navigate('EditPlantReceivedDate', {
            plantKey: plantKey,
            dateReceived: dateReceived
        })
    };

    const onEditNotePress = () => {
        props.navigation.navigate('EditPlantNote', {
            plantKey: plantKey,
            note: note
        })
    };

    const onUpdateWaterLogPress = () => {
        props.navigation.navigate('AddWateringDate', {
            plantKey: plantKey,
            wateringDates: wateringDates
        })
    };

    const onUpdateFertilizingLogPress = () => {
        props.navigation.navigate('AddFertilizingDate', {
            plantKey: plantKey,
            fertilizingDates: fertilizingDates
        })
    };

    const onDeletePress = () => {
        Alert.alert(
            `Are you sure you want to delete ${plantName}?`,
            'This will permanently remove this plant from the database.',
            [
              {text: 'Cancel', onPress: () => console.log('cancel was pressed'), style: 'cancel'},
              {text: 'Delete', onPress: () => deletePlant()}
            ]
          )
    }

    const deletePlant = () => {
        console.log(`${plantName} is about to be deleted with id ${plantKey}`)
        
        const currentUser = firebase.auth().currentUser.uid;

        const plantToDelete = firebase.database().ref(`/users/${currentUser}/plants/${plantKey}`);

        plantToDelete
            .remove()
            .then(() => {
                console.log('plant was deleted...')
                props.navigation.navigate('ListPlants'); 
            })
            .catch((error) => {
                console.log('there was an error deleting this plant: ', error)
            })
    }

    let imageSource = require('../images/sm-plant-placeholder.png');
    if (plantImage) {
        imageSource = {uri: plantImage["uri"]}
    }

    let wateringDisplay = <Text>No record of any past waterings</Text>;
    if (wateringDates) {
        const allWaterings = wateringDates.map((date, i) => 
          <Text key={i} style={styles.dateLogStyle}>{date["watering_date"]}</Text>
        );

        if (allWaterings.length <= 5 && allWaterings.length > 0) {
            wateringDisplay = allWaterings;
        } else if (allWaterings.length > 5){
            wateringDisplay = allWaterings.slice(-5);
        }
    } 

    let fertilizingDisplay = <Text>No record of any past fertilizations</Text>;
    if (fertilizingDates) {
        const allFertilizings = fertilizingDates.map((date, i) => 
            <Text key={i} style={styles.dateLogStyle}>{date["fertilizing_date"]}</Text>
        );

        if (allFertilizings.length <= 5 && allFertilizings.length > 0) {
            fertilizingDisplay = allFertilizings;
        } else if (allFertilizings.length > 5) {
            fertilizingDisplay = allFertilizings.slice(-5);
        }
    }

    return (
        <View style={styles.aboutAppMainStyle}>
            <Header drawerNav={props.navigation.openDrawer}/>

            <ScrollView style={styles.mainPlantSectionStyle}>

                <Text style={styles.plantNameTitle}>{plantName}</Text>
                
                <Button 
                    title='Edit Name'
                    onPress={() => onEditNamePress()}
                />

                <Image 
                    style={styles.plantImageStyle}
                    source={imageSource}
                />

                <Button 
                    title="Update Plant Image"
                    onPress={() => props.navigation.navigate('AddImage', {plantKey, plantImage})}
                />
        
                <View style={styles.plantDateStyle}>
                    <Text style={styles.plantSectionNameText}>Date Received: </Text>
                    <Text>{dateReceived}</Text>
                </View>

                <Button 
                    title='Edit Date'
                    onPress={() => onEditDatePress()}
                />


                <View>
                    <Text style={styles.plantSectionNameText}>A bit about this plant:</Text>
                
                    {note === '' ? 
                        <Text style={styles.plantNoNotesStyle}>No notes for this plant</Text> :
                        <Text>{note}</Text>
                    }
                    <Button 
                        title='Edit Note'
                        onPress={() => onEditNotePress()}
                    />
                    
                </View>

                <View>
                    <Text style={styles.plantLogSectionNameText}>Watering Log</Text>
                    <View style={styles.plantLogDatesDisplay}>
                        {wateringDisplay}
                    </View>
                    <Button 
                        title="I just watered this! Update Log"
                        onPress={() => onUpdateWaterLogPress()}
                    />
                </View>

                <View>
                    <Text style={styles.plantLogSectionNameText}>Fertilizing Log</Text>
                    <View style={styles.plantLogDatesDisplay}>
                        {fertilizingDisplay}
                    </View>
                    <Button 
                        title="I just fertilized! Update Log"
                        onPress={() => onUpdateFertilizingLogPress()}
                    />
                </View>

                <View>
                    <Button 
                        title='Delete Plant'
                        onPress={() => onDeletePress()}
                    />
                </View>
            </ScrollView>
        </View>
        
    )
};

// const styles = StyleSheet.create({
    // aboutAppMainStyle: {
    //     // marginTop: 20,
    //     flex: 1,
    //     backgroundColor: '#BDE1C9', 
    // },
    // headerStyle: {
    //     height: 70,
    //     paddingTop: 30, 
    //     borderColor: '#7A7E7B',
    //     borderBottomWidth: 0.5,
    //     justifyContent: 'space-around',
    //     backgroundColor: '#EFDECE'
    // },
    // headerText: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     fontSize: 22,
    //     color: '#055607',
    //     fontWeight: 'bold',
    //     paddingBottom: 40,
    //     paddingTop: 0
    // },
    // headerImageStyle: {
    //     width: 28, 
    //     height: 28,
    //     marginLeft: 10,
    //     marginTop: 10
    // },
    // plantNameTitle: {
    //     marginTop: 30,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     fontSize: 25
    // },
    // plantSectionNameText: {
    //     fontWeight: 'bold'
    // },
    // plantImageStyle: {
    //     width: 125, 
    //     height: 125,
    //     alignSelf: 'center',
    //     marginTop: 10,
    //     marginBottom: 30,
    //     borderRadius: 120 / 2
    // },
    // plantNoNotesStyle: {
    //     fontStyle: 'italic',
    //     textAlign: 'center',
    //   }
// });

export default Plant;