import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { server } from '../utils/server';


class MakeCard extends Component {
  state = {
    boardTitles: [],
    containerTitiles: [],
    containerID: null,
    containerDisalbe: true,
  }

  componentDidMount() {

  }

  getBoardTitle = () => {
    axios.get(`${server}/board/list`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            ...this.state,
            boardTitles: res.data.boardsTitles,
            containerDisalbe: false,
          });
        }
      });
  }

  getContainerTitle = (id) => {
    axios.get(`${server}/container/list?id=${id}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            containerTitiles: res.data,
          });
        }
      });
  }

  saveContainerId = (ContainerID) => {

  }

  render() {
    return (
            <View style={styles.total}>
              <View style={styles.selectBox}>
                <Text>
                  Select Board
                </Text>
                <RNPickerSelect
                onValueChange={(boardId) => this.getContainerTitle(boardId)}
                items={this.state.boardTitles}
                placeholder={{ label: 'select Board', value: null }} />
              <Text style={styles.containerText}>
                  Select Container
              </Text>
              <RNPickerSelect
                disabled={this.state.containerDisalbe}
                onValueChange={(containerId) => this.saveContainerId(containerId)}
                items={this.state.containerTitiles}
                placeholder={{ label: 'select Container', value: null }} />
              </View>
              <View style={styles.Input}>
                <View style={styles.InputCardData} />
              </View>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  selectBox: {
    flex: 3,
    backgroundColor: 'orange',
  },
  Input: { flex: 5, backgroundColor: 'blue' },
  InputCardData: {
    flex: 3,
  },
  containerText: {
    color: 'green',
  },
});

const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(MakeCard);
