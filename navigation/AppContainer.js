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
import Discussions from '../src/screens/Discussions';
import AddDiscussionThread from '../src/screens/AddDiscussionThread';
import IndividualThread from '../src/screens/IndividualThread';
import AddComment from '../src/screens/AddComment';
import AboutApp from '../src/screens/AboutApp';

// import { 
//   Loading, 
//   Auth, 
//   Home, 
//   AddPlant, 
//   EditPlantName, 
//   EditPlantReceivedDate, 
//   EditPlantNote, 
//   AddWateringDate, 
//   AddFertilizingDate, 
//   ListPlants, 
//   Plant, 
//   Discussions, 
//   AddDiscussionThread, 
//   IndividualThread, 
//   AboutApp 
// } from '../src/screens';

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
        IndividualThread: {
          screen: IndividualThread,
          navigationOptions: {
            drawerLabel: () => null
          }
        },
        AddComment: {
          screen: AddComment,
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