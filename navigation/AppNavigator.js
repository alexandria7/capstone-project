// import React from 'react';
import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Auth from '../src/screens/Auth';
import Home from '../src/screens/Home';
import AddPlant from '../src/screens/AddPlant';
import ListPlants from '../src/screens/ListPlants';
import AboutApp from '../src/screens/AboutApp';

const AppNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: Auth,
      navigationOptions: {
        header: null
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      },
    },
    main: {
      screen: createDrawerNavigator({
        Home: { screen: Home },
        ListPlants: { 
          screen: ListPlants, 
          navigationOptions: {
            drawerLabel: 'My Plants'
          }, 
        },
        AddPlant: { 
          screen: AddPlant, 
          navigationOptions: {
            drawerLabel: 'Add a New Plant'
          },  
        },
        AboutApp: { 
          screen: AboutApp,
          navigationOptions: {
            drawerLabel: 'About Wet Your Plants'
          }, 
        }
      })
    }
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

