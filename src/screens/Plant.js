import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

const Plant = (props) => {

    const note = props.navigation.getParam('note');
    const plantKey = props.navigation.getParam('plantKey');
    const plantName = props.navigation.getParam('plantName');
    let dateReceived = undefined;
    let wateringDates = undefined;
    let fertilizingDates = undefined;
    let plantImage = undefined;

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/image`)
        .on('value', snapshot => {
            console.log('snapshot of image object', snapshot.val());
            if (snapshot.val() !== null) {
                plantImage = snapshot.val();
            }
        })
    
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/date_received`)
        .on('value', snapshot => {
            console.log('snapshot of dateReceived object', snapshot.val());
            
            dateReceived = snapshot.val();
            console.log('date received: ', dateReceived);
        })

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/fertilizings`)
        .on('value', snapshot => {
            fertilizingDates = _.map(snapshot.val(), (fertilizeObject, key) => {
                fertilizeObject.key = key;
                return fertilizeObject;
            });

            console.log('this is the fertilizings list: ', fertilizingDates)
        })

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/plants/${plantKey}/waterings`)
        .on('value', snapshot => {
            wateringDates = _.map(snapshot.val(), (wateringObject, key) => {
                wateringObject.key = key;
                return wateringObject;
            });
    
            console.log('this is the waterings list: ', wateringDates)
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
                Alert.alert(
                    "There was an error deleting this plant from the database.",
                    "Please try again later.",
                    [
                        {text: 'Ok', onPress: () => console.log('ok was pressed')},
                    ]
                )
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
                
                <TouchableOpacity
                   
                    onPress={() => onEditNamePress()}
                >
                    <Text>Edit Name</Text>
                </TouchableOpacity>

                <Image 
                    style={styles.plantImageStyle}
                    source={imageSource}
                />

                <TouchableOpacity 
              
                    onPress={() => props.navigation.navigate('AddImage', {plantKey, plantImage})}
                >
                    <Text>Update Photo</Text>
                </TouchableOpacity>
        
                <View style={styles.plantDateStyle}>
                    <Text style={styles.plantSectionNameText}>Date Received: </Text>
                    {
                        dateReceived === "" ? 
                        <Text style={styles.plantNoNotesStyle}>No date given</Text> :
                        <Text>{dateReceived}</Text>
                    }
                    
                </View>

                <TouchableOpacity 
                
                    onPress={() => onEditDatePress()}
                >
                    <Text>Edit Date</Text>
                </TouchableOpacity>


                <View>
                    <Text style={styles.plantSectionNameText}>A bit about this plant:</Text>
                
                    {note === '' ? 
                        <Text style={styles.plantNoNotesStyle}>No notes for this plant</Text> :
                        <Text>{note}</Text>
                    }
                    <TouchableOpacity 
              
                        onPress={() => onEditNotePress()}
                    >
                        <Text>Edit Note</Text>
                    </TouchableOpacity>
                    
                </View>

                <View>
                    <Text style={styles.plantLogSectionNameText}>Watering Log</Text>
                    <View style={styles.plantLogDatesDisplay}>
                        {wateringDisplay}
                    </View>
                    <TouchableOpacity 
                        style={styles.plantDropletTouchStyle}
                        onPress={() => onUpdateWaterLogPress()}
                    >
                        <Image 
                            style={{height: 20, width: 20}}
                            source={require('../images/water-droplet.png')}
                        />
                        <Text style={styles.waterButtonTextStyle}>Just watered!</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.plantLogSectionNameText}>Fertilizing Log</Text>
                    <View style={styles.plantLogDatesDisplay}>
                        {fertilizingDisplay}
                    </View>
                    <TouchableOpacity 
                        style={styles.plantDropletTouchStyle}
                        onPress={() => onUpdateFertilizingLogPress()}
                    >
                        <Image 
                            style={{height: 28, width: 28}}
                            source={require('../images/petite-fertilizer-droplet.png')}
                        />
                        <Text style={styles.fertilizeButtonTextStyle}>Just fertilized!</Text>
                    </TouchableOpacity>
                </View>

                <View>

                    <TouchableOpacity 
                        onPress={() => onDeletePress()}
                        style={styles.deletePlantButtonTouchStyle}
                    >
                        <Text style={styles.deletePlantButtonTextStyle}>Delete Plant</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </View>
        
    )
};

export default Plant;