import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import styles from '../components/Styles';

const AboutApp = (props) => {
    return (
        <View style={styles.aboutAppMainStyle}>
            <Header drawerNav={props.navigation.openDrawer}/>

            <ScrollView style={styles.aboutTheAppSection}>
                <Text style={styles.aboutTitleStyle}>
                    Welcome to Wet Your Plants!
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    This app was created by Alex McCarthy for her capstone project for Ada Developers Academy Cohort 11. 
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    It exists so Alex could build an iOS app from scratch, but also so she could help solve a problem she was having (i.e. she has too many plants and can't keep track of all their needs!).
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    Thank you for looking at my app! :)
                </Text>
                <Text style={styles.aboutSignatureText}>Alex</Text>

                <Text style={styles.aboutTitleStyle}>
                    "How do I use this app?"
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    This app was created with two core desires in mind: 
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    1) to be a place where the user can keep track of all their plants and their needs. Keep a journal/note section going of various requirements your plant might need, and keep up to date on when you water and fertilize your plant so you can stay on track!
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    2) to be a place where users can ask each other questions and help each other out. One of the best parts about the houseplant community is that people love sharing knowledge and learning from one another. Feel free to ask the community your plant-related questions, and comment on others' posts with any tips or answers your might have. 
                </Text>

            </ScrollView>
        </View>
    );
}

export default AboutApp;