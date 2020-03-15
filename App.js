import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './components/Main';
import Board from './components/Board';
import Card from './components/Card';
import Login from './components/LoginPage';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator name="Main" components={Main} />
      <Stack.Navigator name="Board" components={Board} />
      <Stack.Navigator name="Card" components={Card} />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
