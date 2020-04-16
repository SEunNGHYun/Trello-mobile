import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';


class MakeBoard extends Component {
  state = {
    boardTitle: '',
  }

  ChangeTitle = (text) => {
    this.setState({
      boardTitle: text,
    });
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
        <View style={styles.total}>
            <Input
            placeholder="Board Title"
            onChangeText={this.ChangeTitle}
            />

        </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'red',
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(MakeBoard);
