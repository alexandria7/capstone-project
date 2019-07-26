// import React from 'react';
import { createSwitchNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
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
import MyConversations from '../src/screens/MyConversations';
import AddImage from '../src/screens/AddImage';
import EditThread from '../src/screens/EditThread';
import EditComment from '../src/screens/EditComment';
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
        MyConversations: {
          screen: MyConversations, 
          navigationOptions: {
            drawerLabel: 'My Conversations'
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
        },
        AddImage: {
          screen: AddImage,
          navigationOptions: {
            drawerLabel: () => null
          }
        },
        EditThread: {
          screen: EditThread,
          navigationOptions: {
            drawerLabel: () => null
          }
        },
        EditComment: {
          screen: EditComment,
          navigationOptions: {
            drawerLabel: () => null
          }
        },
      })
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;