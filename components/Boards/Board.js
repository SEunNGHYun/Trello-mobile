import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight, ScrollView, alert,
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import BoardsTitle from './Boardtitle';
import { boardlist } from '../fakedata';
import { server } from '../utils/server';

class Main extends Component {
  constructor({ navigation }) {
    super(navigation);
    this.state = {
      BoardList: [],
    };
  }

  componentDidMount() {
    this.setState({
      BoardList: boardlist,
    });
    // axios.get(`${server}/board/list`, { headers: { authorization: this.props.token } })
    //   .then((res) => {
    //     if (res.status >= 200) {
    //       this.setState({
    //         BoardList: boardlist,
    //       });
    //     }
    //   });
  }

  longPressButton = () => {
    alert('LOOOOOOOOOOOOOOONNNNNNGGGGGGG');
  }

  render() {
    const { BoardList } = this.state;
    return (
      <View style={styles.total}>
      <ScrollView>
        <View style={styles.Home}>
          {BoardList.length > 0 ? (
          <>
          {BoardList.map((board) => (
            <TouchableHighlight
            onPress={() => this.props.navigation.navigate('InBoard', { id: board.id, name: board.title })}
            onLongPress={this.longPressButton}>
            <BoardsTitle title={board.title} id={board.id} />
            </TouchableHighlight>
          ))}
          </>
          ) : (
          <Text>
            비어있습니다. board를 추가해주세요
          </Text>
          )}
        </View>
      </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item title="Board" buttonColor="#9b59b6" onPress={() => this.props.navigation.navigate('Boards', { screen: 'MakeBoard' })}>
            <Icon name="ei-navicon" style={styles.buttons} />
          </ActionButton.Item>
          <ActionButton.Item title="Card" buttonColor="#3498db" onPress={() => this.props.navigation.navigate('Boards', { screen: 'MakeCard' })}>
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
  buttons: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  Home: {
    flex: 8,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(Main);
