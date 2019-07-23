import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import styles from '../components/Styles';

class EditComment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            comment: this.props.navigation.getParam('comment'),
            question: this.props.navigation.getParam('question')
        };
        
        // tells react-navigation to focus/look at these params
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    discussionKey: this.props.navigation.getParam('discussionKey'),
                    comment: this.props.navigation.getParam('comment'),
                    question: this.props.navigation.getParam('question')
                })
            }
        )
    }

    onCancelPress = () => {
        this.props.navigation.navigate('IndividualThread', {
            discussionKey: this.props.navigation.getParam('discussionKey'),
            comment: this.props.navigation.getParam('comment'),
            question: this.props.navigation.getParam('question')
        });
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

                <View style={styles.mainEditSectionStyle}>
                    <Text style={styles.editTextHeaderStyle}>Edit comment</Text>
                    <Text style={styles.editCommentContextSection}>From thread "{this.state.question}"</Text>

                    <View style={styles.textAreaContainer} >
                        <TextInput 
                            placeholder="new comment"
                            value={this.state.comment}
                            onChangeText={(comment) => this.setState({comment})}
                            multiline = {true}
                            numberOfLines = {4}
                            editable = {true}
                            clearButtonMode='always'
                            style={styles.noteTextArea}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.onCancelPress()}
                        />

                        <Button 
                            title="Update"
                            // onPress={() => this.onEditPlantButtonPress()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default EditComment;