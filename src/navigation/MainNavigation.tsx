import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import CocktailDetailsScreen from '../screens/homestack/CocktailDetailsScreen';
import {StatusBar} from 'react-native';

import {Feed, Favourite, Settings, Categories} from '../screens/bottomtab';
import {Colors, Colors as colors} from '../styles/colors';
import {cocktailProps} from '../types/types';

type TabParamList = {
  Feed: undefined;
  Favourites: undefined;
  Settings: undefined;
  Categories: undefined;
};

type CocktailListItemProps = {
  cocktail: cocktailProps;
};

export type HomeStackParamList = {
  TabsGroup: undefined;
  CocktailDetailsScreen: CocktailListItemProps;
};

// Stack
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="TabsGroup" component={TabsGroup} />
      <HomeStack.Screen
        name="CocktailDetailsScreen"
        component={CocktailDetailsScreen}
        options={{
          presentation: 'modal',
          headerTitle: 'Cocktail Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.headerLightBg,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

// Tabs
const Tab = createBottomTabNavigator<TabParamList>();

function TabsGroup() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: Colors.headerLightBg,
          paddingTop: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'ios-wine' : 'ios-wine-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'ios-settings-sharp';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'documents' : 'documents-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.button,
        tabBarInactiveTintColor: '#aaa',
      })}>
      <Tab.Screen
        name="Feed"
        options={{
          title: 'Cocktails',
          headerStyle: {
            backgroundColor: Colors.headerLightBg,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Feed}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourite}
        options={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <HomeStackGroup />
    </NavigationContainer>
  );
}
