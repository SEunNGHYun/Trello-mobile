import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class FirstPage extends Component {
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
          containerStyle={{ width: 110, height: 45, margin: 10 }}
          titleStyle={{ fontSize: 25 }}
          onPress={() => this.props.navigation.navigate('Login Screen')}
          />
        <Button
          type="OutLine"
          title="회원가입"
          containerStyle={{ width: 110, height: 45, margin: 10 }}
          titleStyle={{ fontSize: 25 }}
          onPress={() => this.props.navigation.navigate('Signup Screen')}
          />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  Buttons: {
    flex: 4.5,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FirstPage;
