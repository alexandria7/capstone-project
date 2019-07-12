import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('receivedDate');
    const notes = props.navigation.getParam('notes');
    const plantKey = props.navigation.getParam('plantKey');

    const onButtonPress = () => {
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
        
        // props.navigation.navigate('ListPlants'); 
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
        
                <Text>Date Received: {dateReceived}</Text>
                <View>
                    <Text>
                        The plant key is {plantKey}
                    </Text>

                
                </View>

            </View>

            <View>
                {/* <Button 
                    title='Edit Plant'
                    onPress={}
                /> */}

                <Button 
                    title='Delete Plant'
                    onPress={() => onButtonPress()}
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
    }
});

export default Plant;