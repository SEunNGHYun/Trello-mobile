import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage, TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { boardlist } from './fakedata';
import { server } from './utils/server';

class Main extends Component {
  constructor({ navigation }) {
    super(navigation);
    this.state = {
      BoardList: [],
    };
  }

  async componentDidMount() {
    const auth = await AsyncStorage.getItem('user_Token');
    axios.get(`${server}/board/list`, { headers: { authorization: auth } })
      .then((res) => {
        if (res.status >= 200) {
          this.setState({
            BoardList: boardlist,
          });
        }
      });
  }

  render() {
    const { BoardList } = this.state;
    return (
      <View style={styles.total}>
        <View style={styles.Home}>
          {BoardList.length > 0 ? (
          <>
          {BoardList.map((board) => (
            <TouchableOpacity
            style={styles.boardTitle}
            onPress={() => this.props.navigation.navigate('Board', { id: board.id })}>
            <Text
            id={board.id}
            style={{ fontSize: 20 }}>
              {board.title}
            </Text>
            </TouchableOpacity>
          ))}
          </>
          ) : (
          <Text>
            비어있습니다. board를 추가해주세요
          </Text>
          )}
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
    backgroundColor: 'green',
  },
  boardTitle: {
    margin: 10,

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

export default Main;
