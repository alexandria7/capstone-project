import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('receivedDate');
    const notes = props.navigation.getParam('notes');

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
                <Text style={styles.infoStyle}>{plantName}!</Text>
                <Text>Received: {dateReceived}</Text>
                <View>
                    <Text>
                        Notes:
                    </Text>

                
                </View>
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
    infoStyle: {
        marginTop: 30
    },
    mainPlantInfo: {
        justifyContent: 'space-between'
    }
});

export default Plant;