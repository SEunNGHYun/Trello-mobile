import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, AsyncStorage,
} from 'react-native';
import { Isao } from 'react-native-textinput-effects';
import axios from 'axios';
import { Button } from 'react-native-elements';
import Alert from 'react-native-awesome-alerts';
import { server } from '../utils/server';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      errAlert: false,
      successAlert: false,
    };
    this.serverConnect = this.serverConnect.bind(this);
  }


  serverConnect() {
    const { email, password } = this.state;
    if (this.state.email === null || this.state.password === null) {
    } else {
      axios.post(`${server}/user/login`, { email, password })
        .then((res) => {
          if (res.status === 201) {
            AsyncStorage.setItem('user_Token', res.data.token);
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
        show={this.state.FailAlert}
        title="회원가입 실패"
        message="회원가입을 실패하였습니다."
        confirmText="회원가입 다시 하기"
        onConfirmPressed={() => this.setState({
          FailAlert: false, email: null, password: null,
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
export default Login;
