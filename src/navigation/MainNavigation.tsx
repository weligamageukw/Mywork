import React, {useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors, Colors as colors} from '../styles/colors';

import Explore from '../screens/bottomtab/Explore';
import Home from '../screens/bottomtab/Home';
import Library from '../screens/bottomtab/Library';

import Login from '../screens/homestack/Login';
import SongDetailScreen from '../screens/homestack/SongDetailScreen';

import {SongProps} from '../types/types';
import {AuthContext} from '../navigation/AuthContext';
import {StatusBar} from 'react-native';

import {SafeAreaView} from 'react-native';
import appStyles from '../styles/appStyles';

import EncryptedStorage from 'react-native-encrypted-storage';

type TabParamList = {
  Explore: undefined;
  Library: undefined;
  Home: undefined;
};

export type SongDetailScreenProps = {
  song: SongProps;
};

export type HomeStackParamList = {
  Login: undefined;
  SongDetailScreen: SongDetailScreenProps;
  Tabs: undefined;
};

// Stack
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const Router = () => {
  const [signedIn, setSigin] = useState(false);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        setSigin(true);
      },
      signOut: async () => {
        // console.log('signOut');
        try {
          await EncryptedStorage.removeItem('user_session');
          setSigin(false);
        } catch (error) {
          console.log('Error removeUserSession');
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView style={appStyles.safeArea}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <HomeStack.Navigator screenOptions={{headerShown: false}}>
            {!signedIn ? (
              <HomeStack.Screen name="Login" component={Login} />
            ) : (
              <>
                <HomeStack.Screen name="Tabs" component={TabsGroup} />
                <HomeStack.Screen
                  name="SongDetailScreen"
                  component={SongDetailScreen}
                  options={{
                    // presentation: 'card',
                    headerTitle: 'Song Details',
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
              </>
            )}
          </HomeStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

// function HomeStackGroup() {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="Login">
//       <HomeStack.Screen name="Login" component={Login} />
//       {/* <HomeStack.Screen name="NewScreen" component={NewScreen} /> */}
//       {/* <HomeStack.Screen name="SongDetailScreen" component={SongDetailScreen} /> */}

//       <HomeStack.Screen name="Tabs" component={TabsGroup} />
//       <HomeStack.Screen
//         name="SongDetailScreen"
//         component={SongDetailScreen}
//         options={{
//           presentation: 'modal',
//           headerTitle: 'Song Details',
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: Colors.headerLightBg,
//           },
//           headerTintColor: Colors.primary,
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// }

// Tabs
const Tab = createBottomTabNavigator<TabParamList>();

function TabsGroup() {
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

export default Router;
