import React, { Component } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import Axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
    };
  }

  saveInfo(key, value) {
    this.setState({
      [key]: value,
    });
  }

  signupPressButton() {
    Axios('server', this.state);
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
        <KeyboardAvoidingView behavior="position">
        <Hoshi
            label="Name"
            borderColor="#b76c94"
            style={{
              height: 7.5, width: 350, marginBottom: 7.5,
            }}
            borderHeight={3}
            onChange={(text) => this.saveInfo('name', text)}
            inputPadding={16}
          />
         <Hoshi
            label="Email"
            borderColor="#b76c94"
            style={{ height: 7.5, width: 350, marginBottom: 7 }}
            borderHeight={3}
            onChange={(text) => this.saveInfo('email', text)}
            inputPadding={16} />
         <Hoshi
            label="Password"
            borderColor="#b76c94"
            style={{ height: 7.5, width: 350, marginBottom: 13 }}
            borderHeight={3}
            onChange={(text) => this.saveInfo('password', text)}
            inputPadding={16} />
            <View style={{ flexDirection: 'row' }}>
            <Button
            title="회원가입"
            type="outline"
            buttonStyle={{ width: 90, height: 40 }}
            onPress={() => this.signupPressButton} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login Screen')}>
              <Text>
                로그인 페이지
              </Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
