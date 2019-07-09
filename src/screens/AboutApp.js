import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutApp = () => {
    return (
    <View style={styles.aboutAppMainStyle}>
        <Text>
            Welcome to Wet Your Plants!
        </Text>

        <Text>
            This app was created by Alex McCarthy for her capstone project for Ada Developers Academy Cohort 11. It exists so Alex could build an iOS app from scratch, but also so she could help solve a problem she was having (i.e. she has too many plants and can't keep track of all their needs!).
        </Text>
    </View>
    )
};

const styles = StyleSheet.create({
    aboutAppMainStyle: {
        marginTop: 20
    }
  });

export default AboutApp;