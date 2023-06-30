import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Alert, Button, StatusBar} from 'react-native';

import {Colors, Colors as colors} from '../styles/colors';

import Explore from '../screens/bottomtab/Explore';
import Home from '../screens/bottomtab/Home';
import Library from '../screens/bottomtab/Library';

import Login from '../screens/homestack/Login';

type TabParamList = {
  Explore: undefined;
  Library: undefined;
  Home: undefined;
};

export type HomeStackParamList = {
  Login: undefined;
};

// Stack
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Login" component={Login} />
    </HomeStack.Navigator>
  );
}

// Tabs
const Tab = createBottomTabNavigator<TabParamList>();

function TabsGroup() {
  // const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.headerLightBg,
          paddingTop: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.button,
        tabBarInactiveTintColor: '#aaa',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {/* <TabsGroup /> */}
      <HomeStackGroup />
    </NavigationContainer>
  );
}
