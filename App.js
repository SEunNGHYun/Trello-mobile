import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './components/Main';
import Board from './components/Board';
import Card from './components/Card';
import Login from './components/FirstPages/LoginPage';
import Signup from './components/FirstPages/SignupPage';
import First from './components/FirstPages/FirstPage';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Login: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.Login ? null : (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <>
              <Stack.Screen name="First Screen" component={First} />
              <Stack.Screen name="Signup Screen" component={Signup} />
              <Stack.Screen name="Login Screen" component={Login} />
            </>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
// redux로 토큰을 저장 유무를 판단하여 로그인화면을 보여줄지 메인을 보여줄지 판단
//
