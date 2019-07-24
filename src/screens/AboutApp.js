import React from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

const AboutApp = (props) => {
    return (
        <View style={styles.aboutAppMainStyle}>
            <Header drawerNav={props.navigation.openDrawer}/>

            <View style={styles.aboutAppMainStyle}>
                <Text style={styles.aboutTitleStyle}>
                    Welcome to Wet Your Plants!
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    This app was created by Alex McCarthy for her capstone project for Ada Developers Academy Cohort 11. It exists so Alex could build an iOS app from scratch, but also so she could help solve a problem she was having (i.e. she has too many plants and can't keep track of all their needs!).
                </Text>

                <Text>Thank you for looking at my app!</Text>
                <Text style={{fontFamily: 'Zapfino'}}>Alex</Text>
            </View>
        </View>
    );
}

export default AboutApp;