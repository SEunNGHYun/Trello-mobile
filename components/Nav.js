import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginAuth } from './Redux/Reducer';
import Board from './Boards/Board';
import MakeBoard from './MakeSeries/MakeBoard';
import MakeCard from './MakeSeries/MakeCard';
import Login from './FirstPages/LoginPage';
import Signup from './FirstPages/SignupPage';
import UserPage from './UserPage';
import Home from './Home';
import CPHs from './utils/CreatePageHeaders';
import InBoard from './Boards/InBoard';
import First from './FirstPages/FirstPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation, route }) => ({ headerTitle: (props) => <CPHs {...props} title="Home" /> })} />
      <Stack.Screen name="InBoard" component={InBoard} options={{ headerTitle: (props) => <CPHs {...props} /> }} />
      <Stack.Screen name="MakeBoard" component={MakeBoard} options={({ navigation }) => ({ headerTitle: (props) => <CPHs {...props} title="create Board" create="Board" navigation={navigation} /> })} />
      <Stack.Screen name="MakeCard" component={MakeCard} options={({ navigation }) => ({ headerTitle: (props) => <CPHs {...props} title="create Card" create="Card" navigation={navigation} /> })} />
    </Stack.Navigator>
  );
}
function StackBoard() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Board" component={Board} options={{ headerTitle: (props) => <CPHs {...props} title="Boards" /> }} />
        <Stack.Screen name="InBoard" component={InBoard} options={{ headerTitle: (props) => <CPHs {...props} /> }} />
        <Stack.Screen name="MakeBoard" component={MakeBoard} options={({ navigation }) => ({ headerTitle: (props) => <CPHs {...props} title="create Board" create="Board" navigation={navigation} /> })} />
        <Stack.Screen name="MakeCard" component={MakeCard} options={({ navigation }) => ({ headerTitle: (props) => <CPHs {...props} title="create Card" create="Card" navigation={navigation} /> })} />
      </Stack.Navigator>
  );
}

class Nav extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('user_Token');
    if (token) {
      this.props.loginCheck();
      this.props.SaveToken(token);
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
              <Stack.Screen name="First" component={First} />
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
    dispatch(LoginAuth());
  },
});

// redux로 토큰을 저장 유무를 판단하여 로그인화면을 보여줄지 메인을 보여줄지 판단
//
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
