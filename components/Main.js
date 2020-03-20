import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';

class Main extends Component {
  constructor({ navigation }) {
    super(navigation);
  }

  render() {
    return (
      <View style={styles.total}>
        <Text>
            메인 화면
        </Text>

      </View>
    );
  }
}

const styles = {
  total: {
    flex: 1,
    backGorundColor: 'green',
  },
};

export default Main;
