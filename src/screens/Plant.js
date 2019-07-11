import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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

            // console.log("i'm in the plant page for", this.props.plantInfo)
            
                <View>
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