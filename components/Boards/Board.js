import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import axios from 'axios';
import BoardsTitle from './Boardtitle';
import { boardlist } from '../fakedata';
import HeaderLeft from '../Headers/CustomHeader_Left';
import HeaderRight from '../Headers/CustomHeader_Right';
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
        <Header
          containerStyle={{
            height: 55, width: '100%',
          }}
          leftComponent={<HeaderLeft title="Boards" navigation={this.props.navigation} />}
          rightComponent={<HeaderRight />} />
      <ScrollView>
        <View style={styles.Home}>
          {BoardList.length > 0 ? (
          <>
          {BoardList.map((board) => (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InBoard', { id: board.id, name: board.title })}
            onLongPress={this.longPressButton}>
            <BoardsTitle title={board.title} id={board.id} />
            </TouchableOpacity>
          ))}
          </>
          ) : (
          <Text>
            비어있습니다. board를 추가해주세요
          </Text>
          )}
        </View>
      </ScrollView>
        <ActionButton buttonColor="#02b625">
          <ActionButton.Item title="Board" buttonColor="#02b625" onPress={() => this.props.navigation.navigate('Boards', { screen: 'MakeBoard' })}>
            <Icon type="feather" name="layout" color="white" />
          </ActionButton.Item>
          <ActionButton.Item title="Card" buttonColor="#02b625" onPress={() => this.props.navigation.navigate('Boards', { screen: 'MakeCard' })}>
            <Icon type="feather" name="trello" color="white" />
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
  },
  Home: {
    flex: 8,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(Main);
