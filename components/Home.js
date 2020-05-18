import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import axios from 'axios';
import HeaderRight from './Headers/CustomHeader_Right';
import HeaderLeft from './Headers/CustomHeader_Left';
import { server } from './utils/server';

class Home extends Component {
  constructor({ navigation }) {
    super(navigation);
    this.state = {
    };
  }

  async componentDidMount() {
    const auth = await AsyncStorage.getItem('user_Token');
    axios.get(`${server}/board/list`, { headers: { authorization: auth } })
      .then((res) => {
        if (res.status >= 200) {
          if (res.data.length > 0) {
            return this.navigation.navigate('Boards');
          }
        }
      });
  }

  render() {
    return (
      <View style={styles.total}>
        <Header
          containerStyle={{
            height: 55, width: '100%', justifyContent: 'center',
          }}
          leftComponent={<HeaderLeft title="Home" navigation={this.props.navigation} />}
          rightComponent={<HeaderRight />} />
          <View style={styles.Homebox}>
              <Text style={{ fontSize: 20 }}>
                  보드를 만들어 보는 것은 어떨까요??
              </Text>
          </View>
        <ActionButton buttonColor="#02b625">
          <ActionButton.Item title="Board" buttonColor="#02b625" onPress={() => this.props.navigation.navigate('MakeBoard')}>
            <Icon type="feather" name="layout" style={styles.buttons} color="white" />
          </ActionButton.Item>
          <ActionButton.Item title="Card" buttonColor="#02b625" onPress={() => this.props.navigation.navigate('MakeCard')}>
            <Icon type="feather" name="trello" style={styles.buttons} color="white" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total: {
    flex: 1,
  },
  Homebox: {
    width: 400,
    height: 100,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0078D7',
    borderRadius: 10,
  },
  buttons: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  Home: {
    flex: 8,
  },
});

export default Home;
