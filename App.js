import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Main from './components/Main';
import Board from './components/Board';
import Card from './components/Card';
import Reducer from './components/Redux/Reducer';
import Login from './components/FirstPages/LoginPage';
import Signup from './components/FirstPages/SignupPage';
import UserPage from './components/UserPage';
import First from './components/FirstPages/FirstPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const store = createStore(Reducer);

function StackHome() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Card" component={Card} />
      </Stack.Navigator>
  );
}
function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Login: false,
    };
    this.ChangeState = this.ChangeState.bind(this);
  }

  async ChangeState() {
    if (await AsyncStorage.getItem('user_Token')) {
      this.setState({
        Login: true,
      });
    } else {
      this.setState({
        Login: false,
      });
    }
  }

  render() {
    this.ChangeState();
    return (
      <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
        { this.state.Login ? (
            <Drawer.Navigator>
                <Drawer.Screen name="Main" component={StackHome} />
                <Drawer.Screen name="Board" component={BoardStack} />
                <Drawer.Screen name="UserInfo" component={UserPage} />
            </Drawer.Navigator>
        ) : (
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
        </Provider>
      </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}
// redux로 토큰을 저장 유무를 판단하여 로그인화면을 보여줄지 메인을 보여줄지 판단
//
