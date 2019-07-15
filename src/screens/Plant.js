import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('dateReceived');
    const note = props.navigation.getParam('note');
    const plantKey = props.navigation.getParam('plantKey');
    console.log(plantKey)
    const wateringDates = props.navigation.getParam('wateringDates');
    console.log(wateringDates)
    const fertilizingDates = props.navigation.getParam('fertilizingDates');

    // props.navigation.replace('Plant', {
    //     plantKey: props.navigation.getParam('plantKey'), 
    //     plantName: props.navigation.getParam('plantName'), 
    //     note: props.navigation.getParam('note'), 
    //     wateringDates: props.navigation.getParam('wateringDates'),
    //     dateReceived: props.navigation.getParam('receivedDate')
    // })

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
    }

    let wateringDisplay = <Text>No record of any past waterings</Text>;

    if (wateringDates) {
        const allWaterings = wateringDates.map((date, i) => 
          <Text key={i}>{date["watering_date"]}</Text>
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
            <Text key={i}>{date["fertilizing_date"]}</Text>
        );

        if (allFertilizings.length <= 5 && allFertilizings.length > 0) {
            fertilizingDisplay = allFertilizings;
        } else if (allFertilizings.length > 5) {
            fertilizingDisplay = allFertilizings.slice(-5);
        }
    }

    return (
        <View style={styles.aboutAppMainStyle}>
            <View style={styles.headerStyle}>

                <View style={styles.headerNavButton}>
                    <Button
                        title='Open'
                        onPress={ () => props.navigation.openDrawer() }
                    />
                </View>
                <Text style={styles.headerText}>Wet Your Plants</Text>

            </View>    

            <ScrollView style={styles.mainPlantInfo}>

                <Text style={styles.plantNameTitle}>{plantName}</Text>
                <Text>{plantKey}</Text>
                <Button 
                    title='Edit Name'
                    onPress={() => onEditNamePress()}
                />

                <Image 
                    style={styles.plantImageStyle}
                    source={require('../images/sm-plant-placeholder.png')}
                />
        
                <Text>Date Received: {dateReceived}</Text>
                <Button 
                    title='Edit Date'
                    onPress={() => onEditDatePress()}
                />


                <View>
                    <Text>A bit about this plant:</Text>
                
                    {note === '' ? 
                        <Text style={styles.noNotesStyle}>No notes for this plant</Text> :
                        <Text>{note}</Text>
                    }
                    <Button 
                        title='Edit Note'
                        onPress={() => onEditNotePress()}
                    />
                    
                </View>

                <View>
                    <Text>Watering Log:</Text>
                    <View>
                        {wateringDisplay}
                    </View>
                    <Button 
                        title="I just watered this! Update Log"
                        onPress={() => onUpdateWaterLogPress()}
                    />
                </View>

                <View>
                    <Text>Fertilizing Log:</Text>
                    <View>
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

const styles = StyleSheet.create({
    aboutAppMainStyle: {
        // marginTop: 20,
        flex: 1,
        backgroundColor: '#BDE1C9', 
    },
    plantNameTitle: {
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    mainPlantInfo: {
        // justifyContent: 'space-between'
    },
    plantImageStyle: {
        width: 125, 
        height: 125,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 120 / 2
    },
    noNotesStyle: {
        fontStyle: 'italic',
        textAlign: 'center',
      }
});

export default Plant;