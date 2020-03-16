import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class LoginPage extends Component {
  render() {
    return (
      <View style={styles.total}>
        <View style={styles.AppName}>
          <Text style={{ fontSize: 50 }}>
            HELLO
            Trello!
          </Text>
        </View>
        <View style={styles.Buttons}>
          <Button
          type="OutLine"
          title="로그인"
          />
          <Button
          type="OutLine"
          title="회원가입"
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
    flex: 6,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Buttons: {
    flex: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginPage;
