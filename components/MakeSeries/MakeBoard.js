import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Header } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import HeaderLeft from '../Headers/MakePageHeaders_L';
import HeaderRight from '../Headers/MakePageHeaders_R';
import { SaveBoardTitle } from '../Redux/Reducer';
import { server } from '../utils/server';

class MakeBoard extends Component {
  state = {
    Boardtitle: '',
    Disclosure: 'private',
    IconDisalbe: false,
  }

  ChangeStates_ChangeRedux = (key, value) => {
    this.setState({
      [key]: value,
    });
    const obj = {};
    if (key === 'Boardtitle') {
      obj.title = value;
      obj.Disclosure = this.state.Disclosure;
    } else {
      obj.title = this.state.Boardtitle;
      obj.Disclosure = value;
    }
    this.props.SaveBoardTitle(obj);
  }

  createBoard = () => {
    const Title = { title: this.state.Boardtitle, visibility: this.state.Disclosure };
    axios.post(`${server}/boards`, Title, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status >= 200) {
          this.props.navigation.navigate('InBoard', { id: res.data.id, name: res.data.title });
        }
      });
  }

  ChangeDisable = () => {
    if (this.state.Boardtitle.length > 0) {
      this.setState({
        IconDisalbe: true,
      });
    } else {
      this.setState({
        IconDisalbe: false,
      });
    }
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <Header
          containerStyle={{
            height: 55, width: '100%',
          }}
          leftComponent={<HeaderLeft title="Create Board" navigation={this.props.navigation} />}
          rightComponent={<HeaderRight create={this.createBoard} navigation={this.props.navigation} where="Board" title={this.state.Boardtitle} />} />
          <View style={styles.value}>
            <View
            style={styles.NameInput}>
            <Text>Board Name</Text>
            <Input
            placeholder="Board Title"
            onChangeText={(text) => this.ChangeStates_ChangeRedux('Boardtitle', text)}
            />
            </View>
            <Text>Visibility</Text>
            <RNPickerSelect
                onValueChange={(value) => this.ChangeStates_ChangeRedux('Disclosure', value)}
                items={[
                  { label: 'public', value: 'public' },
                ]}
                placeholder={{ label: 'private', value: 'private' }}
            />
            <View style={styles.create}>
              <Text style={styles.createText}>
              create
              </Text>
            </View>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  value: {
    margin: 20,
    marginTop: 50,
  },
  create: {
    alignItems: 'flex-end',
  },
  NameInput: {
    marginBottom: 10,
  },
  createText: {
    fontSize: 20,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});
const mapDispatchToProps = (dispatch) => ({
  SaveBoardTitle: (boardObj) => {
    dispatch(SaveBoardTitle(boardObj));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MakeBoard);
