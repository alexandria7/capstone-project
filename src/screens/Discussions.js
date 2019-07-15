import React, { Component } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

class Discussions extends Component {
    render() {
        return (
            <View>
                <View style={styles.headerStyle}>
                    <View style={styles.headerNavButton}>
                    <Button
                        title='Open'
                        onPress={ () => this.props.navigation.openDrawer() }
                    />
                    </View>
                    <Text style={styles.headerText}>Wet Your Plants</Text>
                </View>

                <View>
                    <Text>All Discussions</Text>
                    <Text>Find and offer planty advice!</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 70,
        paddingTop: 30, 
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        justifyContent: 'space-evenly',
        // alignItems: 'center'
      },
    headerNavButton: {
        justifyContent: 'flex-end'
    },
})

export default Discussions;