import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class Plant extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          plantName: this.props.navigation.getParam('plantName'),
          dateReceived: this.props.navigation.getParam('receivedDate'),
          notes: this.props.navigation.getParam('notes')
        }
    }

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

                <Text style={styles.infoStyle}>Hi I'm a plant page for {this.state.plantName}!</Text>
                <Text>Received: {this.state.dateReceived}</Text>
                <View>
                    <Text>
                        Notes:
                    </Text>

                    
                </View>
            </View>
            
        )
    }
};

const styles = StyleSheet.create({
    infoStyle: {
        marginTop: 30
    }
});

export default Plant;