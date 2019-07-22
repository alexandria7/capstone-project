import React from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../components/Styles';

const AboutApp = (props) => {
    return (
        <View style={styles.aboutAppMainStyle}>
            <View style={styles.headerStyle}>
                <TouchableOpacity 
                onPress={ () => props.navigation.openDrawer() }
                >
                    <Image 
                        style={styles.headerImageStyle}
                        source={require('../images/nav-burger-transparent.png')}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>Wet Your Plants</Text>
            </View>

            <View style={styles.aboutAppMainStyle}>
                <Text style={styles.aboutTitleStyle}>
                    Welcome to Wet Your Plants!
                </Text>

                <Text style={styles.aboutMainBlurbStyle}>
                    This app was created by Alex McCarthy for her capstone project for Ada Developers Academy Cohort 11. It exists so Alex could build an iOS app from scratch, but also so she could help solve a problem she was having (i.e. she has too many plants and can't keep track of all their needs!).
                </Text>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
    // aboutAppMainStyle: {
    //     // marginTop: 20,
    //     flex: 1,
    //     backgroundColor: '#BDE1C9', 
    // },
    // headerStyle: {
    //     height: 70,
    //     paddingTop: 30, 
    //     borderColor: '#7A7E7B',
    //     borderBottomWidth: 0.5,
    //     justifyContent: 'space-around',
    //     backgroundColor: '#EFDECE'
    // },
    // headerText: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     fontSize: 22,
    //     color: '#055607',
    //     fontWeight: 'bold',
    //     paddingBottom: 40,
    //     paddingTop: 0
    // },
    // headerImageStyle: {
    //     width: 28, 
    //     height: 28,
    //     marginLeft: 10,
    //     marginTop: 10
    // },
//     mainAboutSection: {
//         marginLeft: 10,
//         marginRight: 10,
//         paddingTop: 20,
//         flex: 1
//     },
//     aboutTitleStyle: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     aboutMainBlurbStyle: {
//         fontSize: 15
//     }
//   });

export default AboutApp;