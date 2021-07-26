import React from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './Screens/LoginScreen';
import WriteStoryScreen from './Screens/WriteStoryScreen';
import ReadStoryScreen from './Screens/ReadStoryScreen';

export default function App() {
  return (
    <AppContainer />
  );
}

const TabNavigator = createBottomTabNavigator({
  "Write Story": {
    screen: WriteStoryScreen
  },
  "Read Story": {
    screen: ReadStoryScreen
  }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({}) => {
      const routeName = navigation.state.routeName;
      if(routeName === "Write Story"){
        return (
          <Image
          style={{marginTop: -30, width: 40, height: 40}}
          source={require('./assets/write.png')} />
        );
      } else if(routeName === "Read Story"){
        return (
          <Image
          style={{marginTop: -30, width: 40, height: 40}}
          source={require('./assets/read.png')} />
        );
      }
    }
  })
});

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  TabNavigator: {
    screen: TabNavigator
  }
});

const AppContainer = createAppContainer(SwitchNavigator);