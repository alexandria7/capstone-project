import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './Styles';

const Header = (props) => {
    return (
        <View style={styles.headerStyle}>
            <TouchableOpacity 
                onPress={ () => props.drawerNav() }
            >
                <Image 
                style={styles.headerImageStyle}
                source={require('../images/nav-burger-transparent.png')}
                />
            </TouchableOpacity>

            <Text style={styles.headerText}>Wet Your Plants</Text>
        </View>
    )
}

export default Header;

