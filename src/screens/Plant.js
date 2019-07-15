import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Button, Alert, TextInput, ScrollView, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('receivedDate');
    const note = props.navigation.getParam('note');
    const plantKey = props.navigation.getParam('plantKey');
    const wateringDates = [];

    const onEditNamePress = () => {
        props.navigation.navigate('EditPlantName', {
            plantKey: plantKey,
            plantName: plantName
        })
    }

    const onEditDatePress = () => {
        props.navigation.navigate('EditPlantReceivedDate', {
            plantKey: plantKey,
            dateReceived: dateReceived
        })
    }

    const onEditNotePress = () => {
        props.navigation.navigate('EditPlantNote', {
            plantKey: plantKey,
            note: note
        })
    }

    const onUpdateWaterLogPress = () => {
        props.navigation.navigate('AddWateringDate', {
            plantKey: plantKey,
            wateringDates: wateringDates
        })
    }

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

    // if (wateringDates.length !== 0) {
    //     wateringDisplay = wateringDates.
    // } 


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

            <View style={styles.mainPlantInfo}>

                <Text style={styles.plantNameTitle}>{plantName}</Text>
                <Text>{plantKey}</Text>
                <Button 
                    title='Edit Name'
                    onPress={() => onEditNamePress()}
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
                    {wateringDisplay}
                    <Button 
                        title="I just watered this! Update Log"
                        onPress={() => onUpdateWaterLogPress()}
                    />
                </View>
                
            </View>

            <View>
                <Button 
                    title='Delete Plant'
                    onPress={() => onDeletePress()}
                />
            </View>
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
        justifyContent: 'space-between'
    },
    noNotesStyle: {
        fontStyle: 'italic',
        textAlign: 'center',
      }
});

export default Plant;