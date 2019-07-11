import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Plant = (props) => {

    const plantName = props.navigation.getParam('plantName');
    const dateReceived = props.navigation.getParam('receivedDate');
    const notes = props.navigation.getParam('notes');

    // this.state = {
    //     plantName: this.props.navigation.getParam('plantName'),
    //     dateReceived: this.props.navigation.getParam('receivedDate'),
    //     notes: this.props.navigation.getParam('notes')
    //   }
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

            <Text style={styles.infoStyle}>Hi I'm a plant page for {plantName}!</Text>
            <Text>Received: {dateReceived}</Text>
            <View>
                <Text>
                    Notes:
                </Text>

                
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
    }
});

export default Plant;