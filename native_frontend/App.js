/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import PostHistory from './pages/PostHistory';
import PostCreation from './pages/PostCreation';
import JoinRequest from './pages/JoinRequest';
import RequestList from './pages/RequestList';

import {AppProvider} from './context';

const Stack = createNativeStackNavigator();
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostHistory"
            component={PostHistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostCreation"
            component={PostCreation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="JoinRequest"
            component={JoinRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RequestList"
            component={RequestList}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
