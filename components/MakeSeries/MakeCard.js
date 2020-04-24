import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements';
import { SaveCardName, SaveCardDescription, SaveCardDate } from '../Redux/Reducer';
import { server } from '../utils/server';


class MakeCard extends Component {
  state = {
    boardTitles: [],
    containerTitiles: [],
    containerID: null,
    containerDisalbe: true,
    cardContents: {},
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
            ...this.state,
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
                <View style={styles.InputCardData}>
                  <View style={styles.InputData}>
                    <Input
                    placeholder="Card Name"
                    onChangeText={this.props.SaveCardName} />
                    <Input
                    placeholder="Card Description"
                    onChangeText={this.props.SaveCardDescription} />
                  </View>
                </View>
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
  Input: {
    flex: 5,
    backgroundColor: 'blue',
  },
  InputCardData: {
    width: '100%',
    height: '60%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputData: {
    width: '94%',
    height: '80%',
    backgroundColor: 'white',
  },
  containerText: {
    color: 'green',
  },
});

const mapStateToProps = ({ token }) => ({
  token,
});
const mapDispatchToProps = (dispatch) => ({
  SaveCardName: (name) => {
    dispatch(SaveCardName(name));
  },
  SaveCardDescription: (description) => {
    dispatch(SaveCardDescription(description));
  },
  SaveCardDate: (date) => {
    dispatch(SaveCardDate(date));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MakeCard);
