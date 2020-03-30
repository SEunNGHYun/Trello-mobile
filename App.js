import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import Board from './components/Boards/Board';
import Containers from './components/Containers/Containers';
import MakeBoard from './components/MakeBoardAndCard/MakeBoard';
import MakeCard from './components/MakeBoardAndCard/MakeCard';
// import Reducer from './components/Redux/Reducer';
import Login from './components/FirstPages/LoginPage';
import Signup from './components/FirstPages/SignupPage';
import UserPage from './components/UserPage';
import Home from './components/Home';
import InBord from './components/Boards/InBoard';
import MakContainer from './components/MakeContainer';
import First from './components/FirstPages/FirstPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackBoard() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="InBoard" component={InBord} />
        <Stack.Screen name="Boards" component={Board} options={{ title: 'Boards' }} />
        <Stack.Screen name="MakeBoard" component={MakeBoard} options={{ title: 'MakeBoard' }} />
        <Stack.Screen name="MakeCard" component={MakeCard} options={{ title: 'MakeCard' }} />
        <Stack.Screen name="MakContainer" component={MakContainer} options={{ title: 'MakContainer' }} />
        <Stack.Screen name="Containers" component={Containers} options={{ title: 'Card' }} />
      </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Login: false,
    };
    this.ChangeLoginState = this.ChangeLoginState.bind(this);
  }

  async ChangeLoginState() {
    if (await AsyncStorage.getItem('user_Token')) {
      this.setState({
        Login: true,
      });
    }
  }

  render() {
    this.ChangeLoginState();
    return (
      <NavigationContainer>
      <SafeAreaProvider>
        { this.state.Login ? (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
                <Drawer.Screen name="Boards" component={StackBoard} />
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
      </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}
// redux로 토큰을 저장 유무를 판단하여 로그인화면을 보여줄지 메인을 보여줄지 판단
//
