import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { SaveBoardTitle } from '../Redux/Reducer';
import { server } from '../utils/server';


class MakeBoard extends Component {
  state = {
    Boardtitle: '',
    Disclosure: 'private',
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
    const Title = { title: this.state.boardTitle };
    axios.post(`${server}/board/create`, Title, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.props.navigation.navigate('Boards');
        }
      });
  }

  render() {
    return (
        <View>
          <View style={styles.value}>
            <Input
            placeholder="Board Title"
            onChangeText={(text) => this.ChangeStates_ChangeRedux('Boardtitle', text)}
            />
            <RNPickerSelect
                onValueChange={(value) => this.ChangeStates_ChangeRedux('Disclosure', value)}
                items={[
                  { label: 'public', value: 'public' },
                ]}
                placeholder={{ label: 'private', value: 'private' }}
            />
            <View style={styles.create}>
              <Text>
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
    backgroundColor: 'green',
  },
  create: {

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
