import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, TextInput, ScrollView, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('receivedDate');
    const notes = props.navigation.getParam('notes');
    const plantKey = props.navigation.getParam('plantKey');

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

    let allNotes = <Text style={styles.noNotesStyle}>No notes for this plant</Text>;

    if (notes) {
        allNotes = notes.map((note, i) => {
            return (<Text key={i}>{note}</Text>)
        })
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
                    <Text>Notes:</Text>
                
                    <ScrollView>{allNotes}</ScrollView> 
                    
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