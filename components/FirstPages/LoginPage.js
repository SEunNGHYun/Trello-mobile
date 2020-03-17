import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, alert,
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import axios from 'axios';
import { Button } from 'react-native-elements';
import Alert from 'react-native-awesome-alerts';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
    };
  }

  saveInfo(key, value) {
    this.setState({
      [key]: value,
    });
  }

  serverConnect() {
    if (this.state.email === null || this.state.password !== null) {

    } else {
      axios('server', this.state);
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
            <Hoshi
            label="Email"
            borderColor="#b76c94"
            borderHeight={3}
            inputPadding={16}
            onChange={(text) => this.saveInfo('email', text)}
            style={{ height: 10, width: 350 }}
            />
            <Hoshi
            label="Password"
            borderColor="#b76c94"
            style={{ height: 10, width: 350, marginBottom: 15 }}
            borderHeight={3}
            onChange={(text) => this.saveInfo('password', text)}
            inputPadding={16} />
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
