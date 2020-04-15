import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { saveTokenInStore } from './Redux/Reducer';
import Board from './Boards/Board';
import MakeBoard from './MakeBoardAndCard/MakeBoard';
import MakeCard from './MakeBoardAndCard/MakeCard';
import Login from './FirstPages/LoginPage';
import Signup from './FirstPages/SignupPage';
import UserPage from './UserPage';
import Home from './Home';
import InBoard from './Boards/InBoard';
import First from './FirstPages/FirstPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Stack.Screen name="InBoard" component={InBoard} />
      <Stack.Screen name="MakeBoard" component={MakeBoard} />
      <Stack.Screen name="MakeCard" component={MakeCard} />
    </Stack.Navigator>
  );
}
function StackBoard() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="InBoard" component={InBoard} />
        <Stack.Screen name="MakeBoard" component={MakeBoard} />
        <Stack.Screen name="MakeCard" component={MakeCard} />
      </Stack.Navigator>
  );
}

class Nav extends Component {
  async componentDidMount() {
    if (await AsyncStorage.getItem('user_Token')) {
      this.props.loginCheck();
    }
  }

  render() {
    return (
      <NavigationContainer>
      <SafeAreaProvider>
        { this.props.Login ? (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={StackHome} />
                <Drawer.Screen name="Boards" component={StackBoard} />
                <Drawer.Screen name="UserInfo" component={UserPage} />
            </Drawer.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
              <Stack.Screen name="First Screen" component={First} />
              <Stack.Screen name="Signup Screen" component={Signup} />
              <Stack.Screen name="Login Screen" component={Login} />
          </Stack.Navigator>
        )}
      </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({ SavetokenInStorage }) => ({
  Login: SavetokenInStorage,
});

const mapDispatchToProps = (dispatch) => ({
  loginCheck: () => {
    dispatch(saveTokenInStore());
  },
});

// redux로 토큰을 저장 유무를 판단하여 로그인화면을 보여줄지 메인을 보여줄지 판단
//
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
