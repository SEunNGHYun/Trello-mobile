import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Input, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { SaveCardName, SaveCardDescription, SaveCardDate } from '../Redux/Reducer';
import { server } from '../utils/server';
import ModelContents from './Picker_Date';


class MakeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTitles: [],
      containerTitiles: [],
      containerID: null,
      containerDisalbe: false,
      cardContents: {},
      dateModal: false,
    };
  }


  componentDidMount() {
    this.getBoardTitle();
  }

  getBoardTitle = () => {
    axios.get(`${server}/board/list`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            ...this.state,
            boardTitles: res.data.boardsTitles,
          });
        }
      });
  }


  getContainerTitle = (id) => {
    this.setState({
      ...this.state,
      containerDisalbe: true,
    });
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

  cardServerToss = () => {
    axios.post(`${server}/card/create?${this.state.containerID}`);
  }

  render() {
    console.log('this.date', this.date);
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
                <View style={this.state.containerDisalbe ? styles.trueInputCardData : styles.falseInputCardData}>
                  <View style={styles.InputData}>
                    <Input
                    placeholder="Card Name"
                    onChangeText={this.props.SaveCardName} />
                    <Input
                    placeholder="Card Description"
                    onChangeText={this.props.SaveCardDescription} />
                    <TouchableOpacity
                    style={styles.calendar}
                    onPress={() => this.setState({ dateModal: !this.state.dateModal })}>
                    <Icon type="feather" name="calendar" />
                    <Text>Due Date ...</Text>
                    </TouchableOpacity>
                    <Modal
                    isVisible={this.state.dateModal}>
                      <ModelContents />
                    </Modal>
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
    backgroundColor: 'pink',
  },
  falseInputCardData: {
    width: '100%',
    height: '60%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trueInputCardData: {
    width: '100%',
    height: '60%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputData: {
    width: '94%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerText: {
    color: 'green',
  },
  calendar: {
    flexDirection: 'row',
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
