import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Isao } from 'react-native-textinput-effects';
import Axios from 'axios';
import Alert from 'react-native-awesome-alerts';
import { server } from '../utils/server';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      SuccessAlert: false,
      FailAlert: false,
    };
    this.signupAfter = this.signupAfter.bind(this);
    this.signupPressButton = this.signupPressButton.bind(this);
  }

  signupAfter() {
    this.setState({
      SuccessAlert: false,
    });
    return this.props.navigation.navigate('Login Screen');
  }

  signupPressButton() {
    const { name, password, email } = this.state;
    Axios.post(`${server}/users/signup`, {
      data: {
        name,
        password,
        email,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          this.setState({
            SuccessAlert: true,
          });
        }
      }).catch((err) => new Error(err));
  }

  render() {
    return (
      <View style={styles.total}>
        <View style={styles.AppName}>
          <Text style={{ fontSize: 50 }}>
            Hello!
          </Text>
        </View>
        <View style={styles.Inputs}>
          <Isao
                label="Name"
                style={{ width: 330, marginTop: 15 }}
                activeColor="#da7071"
                borderHeight={8}
                inputPadding={16}
                labelHeight={24}
                passiveColor="black"
                onChangeText={(text) => this.setState({ name: text })}
          />
          <Isao
                label="Email"
                activeColor="#da7071"
                borderHeight={8}
                style={{ width: 330 }}
                inputPadding={16}
                labelHeight={24}
                passiveColor="black"
                onChangeText={(text) => this.setState({ email: text })}
            />
            <Isao
                label="Password"
                style={{ width: 330, marginBottom: 20 }}
                activeColor="#da7071"
                borderHeight={8}
                inputPadding={16}
                labelHeight={24}
                passiveColor="black"
                onChangeText={(text) => this.setState({ password: text })}
            />
            <View style={{ flexDirection: 'row' }}>
            <Button
            title="회원가입"
            type="outline"
            buttonStyle={{ width: 90, height: 40 }}
            onPress={() => this.signupPressButton()} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login Screen')}>
              <Text>
                로그인 페이지
              </Text>
            </TouchableOpacity>
            </View>
        </View>
        <Alert
        show={this.state.SuccessAlert}
        title="회원가입 성공"
        message="성공적으로 회원가입 되었습니다."
        showConfirmButton
        confirmText="로그인 하러 가기"
        confirmButtonColor="blue"
        onConfirmPressed={() => this.signupAfter()} />
        <Alert
        show={this.state.FailAlert}
        title="회원가입 실패"
        message="회원가입을 실패하였습니다."
        confirmText="회원가입 다시 하기"
        onConfirmPressed={() => this.setState({
          FailAlert: false, email: null, password: null, name: null,
        })}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
  },
  AppName: {
    flex: 3,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Inputs: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Signup;
