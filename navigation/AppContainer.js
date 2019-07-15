// import React from 'react';
import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Loading from '../src/screens/Loading';
import Auth from '../src/screens/Auth';
import Home from '../src/screens/Home';
import AddPlant from '../src/screens/AddPlant';
import EditPlantName from '../src/screens/EditPlantName';
import EditPlantReceivedDate from '../src/screens/EditPlantReceivedDate';
import EditPlantNote from '../src/screens/EditPlantNote';
import AddWateringDate from '../src/screens/AddWateringDate';
import AddFertilizingDate from '../src/screens/AddFertilizingDate';
import ListPlants from '../src/screens/ListPlants';
import Plant from '../src/screens/Plant';
import AboutApp from '../src/screens/AboutApp';

const AppNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      },
    },
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
            drawerLabel: 'My Plants',
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
        },
        Plant: { 
          screen: Plant,
          navigationOptions: {
            drawerLabel: () => null
          },
        },
        EditPlantName: {
          screen: EditPlantName,
          navigationOptions: {
            drawerLabel: () => null
          }
        }, 
        EditPlantReceivedDate: {
          screen: EditPlantReceivedDate, 
          navigationOptions: {
            drawerLabel: () => null
          }
        },
        EditPlantNote: {
          screen: EditPlantNote,
          navigationOptions: {
            drawerLabel: () => null
          }
        },
        AddWateringDate: {
          screen: AddWateringDate, 
          navigationOptions: {
            drawerLabel: () => null
          }
        }, 
        AddFertilizingDate: {
          screen: AddFertilizingDate,
          navigationOptions: {
            drawerLabel: () => null
          }
        }
      })
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

