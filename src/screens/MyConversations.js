import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

class MyConversations extends Component {
    constructor(props) {
        super(props);
    
    }
    render() {
        return (
            <View style={styles.aboutAppMainStyle}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity 
                    onPress={ () => this.props.navigation.openDrawer() }
                    >
                        <Image 
                            style={styles.headerImageStyle}
                            source={require('../images/nav-burger-transparent.png')}
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Wet Your Plants</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    aboutAppMainStyle: {
        // marginTop: 20,
        flex: 1,
        backgroundColor: '#BDE1C9', 
    },
    headerStyle: {
        height: 70,
        paddingTop: 30, 
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        justifyContent: 'space-around',
        backgroundColor: '#EFDECE'
    },
    headerText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 22,
        color: '#055607',
        fontWeight: 'bold',
        paddingBottom: 40,
        paddingTop: 0
    },
    headerImageStyle: {
        width: 28, 
        height: 28,
        marginLeft: 10,
        marginTop: 10
    }, 
})

export default MyConversations;