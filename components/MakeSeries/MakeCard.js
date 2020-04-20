import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class MakeCard extends Component {
  state = {
    boardTitles: [],
    containerTitiles: [],
  }

  getBoardTitle = () => {
    axios.get(`${server}/board/list`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            boardTitles: res.data.boardsTitles,
          });
          this.getContainerTitle(res.data.id);
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

  render() {
    return (
            <View style={styles.total}>
                <Text>
                    Card 만드는 곳
                </Text>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(MakeCard);
