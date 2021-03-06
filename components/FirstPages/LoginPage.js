import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, AsyncStorage,
} from 'react-native';
import { Isao } from 'react-native-textinput-effects';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Alert from 'react-native-awesome-alerts';
import { LoginAuth, SaveToken } from '../Redux/Reducer';
import { server } from '../utils/server';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      loginFailAlert: false,
      successAlert: false,
    };
    this.serverConnect = this.serverConnect.bind(this);
  }


  async serverConnect() {
    const { email, password } = this.state;
    if (this.state.email === null || this.state.password === null) {
      this.setState({
        loginFailAlert: true,
      });
    } else {
      axios.post(`${server}/users/login`, { email, password })
        .then(async (res) => {
          if (res.status === 201) {
            this.props.loginCheck();
            this.props.SaveToken(res.data.token);
            await AsyncStorage.setItem('user_Token', res.data.token);
          } else {
            this.setState({
              errAlert: false,
            });
          }
        });
    }
  }

  render() {
    return (
        <View style={styles.total}>
        <View style={styles.AppName}>
            <Text style={{ fontSize: 50 }}>
            Hi!
            </Text>
        </View>
        <View style={styles.Inputs}>
        <Isao
                label="Email"
                style={{ width: 330, marginTop: 15 }}
                activeColor="#da7071"
                borderHeight={8}
                inputPadding={16}
                labelHeight={24}
                passiveColor="black"
                onChangeText={(text) => this.setState({ email: text })}
          />
            <Isao
                label="Password"
                style={{ width: 330, marginBottom: 10 }}
                activeColor="#da7071"
                borderHeight={8}
                inputPadding={16}
                labelHeight={24}
                passiveColor="black"
                onChangeText={(text) => this.setState({ password: text })}
          />
            <View style={{ flexDirection: 'row' }}>
            <Button
            title="로그인"
            type="outline"
            buttonStyle={{ width: 90, height: 40 }}
            onPress={this.serverConnect} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup Screen')}>
                <Text>
                    회원가입
                </Text>
            </TouchableOpacity>
            </View>
            <Alert
              show={this.state.loginFailAlert}
              title="로그인 실패"
              message="로그인에 실패하였습니다."
              confirmText="로그인 다시 하기"
              onConfirmPressed={() => this.setState({
                loginFailAlert: false, email: null, password: null,
              })} />
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
  },
  AppName: {
    flex: 4,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Inputs: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapDispatchToProps = (dispatch) => ({
  loginCheck: () => {
    dispatch(LoginAuth());
  },
  SaveToken: (token) => {
    dispatch(SaveToken(token));
  },
});
export default connect(null, mapDispatchToProps)(Login);
