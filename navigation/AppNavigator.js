// import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Auth from '../src/screens/Auth';
import Home from '../src/screens/Home';
import AddPlant from '../src/screens/AddPlant';
import ListPlants from '../src/screens/ListPlants';
import AboutApp from '../src/screens/AboutApp';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      },
    },
    AddPlant: {
      screen: AddPlant
    },
    ListPlants: {
      screen: ListPlants
    }, 
    AboutApp: {
      screen: AboutApp
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

