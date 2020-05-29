import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Input, Icon, Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {
  SaveCardName, SaveCardDescription, SaveCardDate, SaveContainerID,
} from '../Redux/Reducer';
import HeaderLeft from '../Headers/MakePageHeaders_L';
import HeaderRight from '../Headers/MakePageHeaders_R';
import { server } from '../utils/server';
import { boardslist } from '../fakedata';
import ModelContents from './Picker_Date';


class MakeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTitles: [],
      containerTitles: [],
      containerID: null,
      enabled: false,
      cardContents: {},
      dateModal: false,
      makeIconDisable: false,
    };
  }


  componentDidMount() {
    this.getBoardTitle();
  }

  getBoardTitle = () => {
    axios.get(`${server}/boards`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          const boardTitles = res.data.list.map((obj) => ({
            label: obj.title,
            value: obj.id,
          }));
          this.setState({
            ...this.state,
            boardTitles,
          });
        }
      });
  }


  getContainers = (id) => {
    this.setState({
      enabled: false,
    });
    axios.get(`${server}/containers/${id}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        console.log(res.data);
        const containerTitles = res.data.result.map((obj) => ({
          label: obj.title,
          value: obj.id,
        }));
        this.setState({
          ...this.state,
          containerTitles,
        });
      });
  }

  saveContainerId = (ContainerID) => {
    this.setState({
      useSelectContainer: true,
    });
    this.ChangeIconDisable();
  }

  ChangeIconDisable = () => {
    this.setState({
      enabled: true,
    });
  }

  render() {
    console.log('board', this.state.boardTitles);
    return (
            <View style={styles.total}>
              <Header
              containerStyle={{
                height: 55, width: '100%',
              }}
              leftComponent={<HeaderLeft title="Create Card" navigation={this.props.navigation} />}
              rightComponent={<HeaderRight navigation={this.props.navigation} able={this.state.enabled} where="Card" Change={this.ChangeIconDisable} />} />
              <View style={styles.selectBox}>
                <Text>
                  Select Board
                </Text>
                <RNPickerSelect
                onValueChange={(pick) => this.getContainers(pick)}
                items={this.state.boardTitles}
                placeholder={{ label: 'select Board', value: null }} />
              <Text style={styles.containerText}>
                  Select Container
              </Text>
              <RNPickerSelect
                disabled={this.state.enabled}
                onValueChange={(pick) => this.saveContainerId(pick)}
                items={boardslist}
                placeholder={{ label: 'select Container', value: null }} />
              </View>
              <View style={{ flex: 1, marginBottom: 50 }} />
              <View style={{ flex: 7 }}>
              <View style={styles.Input}>
                <View
                style={this.state.containerDisalbe ? styles.trueInputCardData : styles.falseInputCardData}>
                  <View
                  style={styles.InputData}>
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
                      <ModelContents closeModal={() => this.setState({ dateModal: !this.state.dateModal })} detail={false} />
                    </Modal>
                  </View>
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
  },
  selectBox: {
    flex: 2.5,
    marginTop: 35,
  },
  Input: {
    position: 'absolute',
    height: 350,
    width: '100%',
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
  SaveContainerId: (CotainerId) => {
    dispatch(SaveContainerID(CotainerId));
  },
  SaveCardDate: (date) => {
    dispatch(SaveCardDate(date));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MakeCard);
