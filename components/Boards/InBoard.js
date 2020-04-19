import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { server } from '../utils/server';
import Containers from '../Containers/Containers';

class InBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Containers: [],
    };
  }

  async componentDidMount() {
    axios.get(`${server}/container?board_id=${this.props.id}`, { headers: { authorization: this.props.token } })
      .then((Res) => {
        this.setState({
          Containers: Res.data,
        });
      });
  }

  render() {
    const { id } = this.props.route.params;
    return (
        <View style={styles.total}>
            { this.state.Containers.length === 0 ? (
              <View style={styles.container}>
              <Containers contain={2} boardId={id} />
              </View>
            )
              : (
              <ScrollView>
                {this.state.Containers.map((container) => <Containers contain={container} boardId={id} />)}
              </ScrollView>
              )}
        </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'red',
  },
  container: {
    margin: 10,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(InBoard);
