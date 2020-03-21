import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/EvilIcons';


class Main extends Component {
  constructor({ navigation }) {
    super(navigation);
  }

  render() {
    return (
      <View style={styles.total}>
        <View style={styles.Home}>
        <Text>
            메인 화면
        </Text>
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item title="Board" buttonColor="#9b59b6" onPress={() => this.props.navigation.navigate('Board')}>
            <Icon name="archive" style={styles.buttons} />
          </ActionButton.Item>
          <ActionButton.Item title="Card" buttonColor="#3498db" onPress={() => this.props.navigation.navigate('Card')}>
            <Icon name="ios-photos" style={styles.buttons} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = {
  total: {
    flex: 1,
    backGorundColor: 'green',
  },
  buttons: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};

export default Main;
