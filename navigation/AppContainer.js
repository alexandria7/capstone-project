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
// import CreateLocalNotif from '../src/screens/CreateLocalNotif';
import Discussions from '../src/screens/Discussions';
import AddDiscussionThread from '../src/screens/AddDiscussionThread';
import IndividualThread from '../src/screens/IndividualThread';
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
        },
        // CreateLocalNotif: {
        //   screen: CreateLocalNotif,
        //   navigationOptions: {
        //     drawerLabel: () => null
        //   }
        // },
        Discussions: {
          screen: Discussions,
          navigationOptions: {
            drawerLabel: 'Discussion Forum'
          }, 
        },
        AddDiscussionThread: {
          screen: AddDiscussionThread,
          navigationOptions: {
            drawerLabel: 'Start a Discussion Thread'
          },
        },
        IndividualThread: {
          screen: IndividualThread,
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