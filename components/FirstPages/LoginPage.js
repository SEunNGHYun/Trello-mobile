import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      email: null,
    };
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
          <Sae
          label="Email"
          iconClass={FontAwesomeIcon}
          iconName="pencil"
          iconColor="white"
          inputPadding={16}
          labelHeight={24}
          borderHeight={2}
          autoCapitalize="none"
          autoCorrect={false}
          />
          <Sae
          label="Password"
          iconClass={FontAwesomeIcon}
          iconName="pencil"
          iconColor="white"
          inputPadding={16}
          labelHeight={24}
          borderHeight={2}
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'red',
  },
  AppName: {
    flex: 4,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Inputs: {
    flex: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
