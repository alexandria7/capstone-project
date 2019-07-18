import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';

class AddDiscussionThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
        question: '',
        questionBody: '',
        userId: '',
        userName: ''
    };
  }

  addInfoToDatabaseAndClear = () => {
    console.log('submit was pressed')
    // console.log(new Date().getDate())
    // this.setState({user: firebase.auth().currentUser.uid})

    const dataRef = firebase.database().ref('/discussions')
      .push({
        question: this.state.question,
        question_body: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName
      }).key

      console.log('the discussion thread key that was just created is', dataRef)

      this.props.navigation.navigate('IndividualThread', {
        question: this.state.question,
        questionBody: this.state.questionBody,
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        discussionKey: dataRef
      })

      console.log('about to reset the state!!!!!')
      this.setState({
          question: '',
          questionBody: '',
          userId: '',
          userName: ''
      });
      console.log('i should have just reset my state!!!!')
    
  }

  render() {
    return (
      <View style={styles.addPlantMainStyle}>
        <Button
          title='Open'
          onPress={ () => this.props.navigation.openDrawer() }
        />

        <ScrollView style={styles.addPlantForm}>
        
          <View>
            <Text>Start a Discussion Thread</Text>
            <Text>Got a planty question, concern, or comment? Post away and other users can comment with their thoughts!</Text>
          </View>

          <View>
            <Text>Question: </Text>
            <TextInput 
              placeholder="My pothos' leaves are turning brown. Help?"
              value={this.state.question}
              onChangeText={(question) => this.setState({question})}
              clearButtonMode='always'
            />
          </View>

          <View>
            <Text>Body: </Text>
            <TextInput 
              placeholder="expand on your question, post pictures, etc."
              value={this.state.questionBody}
              onChangeText={(questionBody) => this.setState({questionBody})}
              clearButtonMode='always'
            />
          </View>

          <Button 
            title="Submit"
            onPress={() => this.addInfoToDatabaseAndClear()}
          />

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  addPlantMainStyle: {
      // marginTop: 20,
      flex: 1,
      backgroundColor: '#BDE1C9', 
      // justifyContent: 'space-between'
  },
  datePickerStyle: {
    width: 200
  }
});

export default AddDiscussionThread;
