import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage,
} from 'react-native';
import { Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import HeaderRight from './utils/CustomHeader_Right';
import HeaderLeft from './utils/CustomHeader_Left';
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
          leftComponent={<HeaderLeft title="Home" />}
          rightComponent={<HeaderRight />} />
          <View style={styles.Homebox}>
              <Text style={{ fontSize: 20 }}>
                  보드를 만들어 보는 것은 어떨까요??
              </Text>
          </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item title="Board" buttonColor="#9b59b6" onPress={() => this.props.navigation.navigate('MakeBoard')}>
            <Icon name="archive" style={styles.buttons} />
          </ActionButton.Item>
          <ActionButton.Item title="Card" buttonColor="#3498db" onPress={() => this.props.navigation.navigate('MakeCard')}>
            <Icon name="ios-photos" style={styles.buttons} />
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
