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
        console.log('RES', Res);
        this.setState({
          Containers: Res.data,
        });
      });
  }

  render() {
    return (
        <View style={styles.total}>
            { this.state.Containers.length === 0 ? (
              <Containers make={false} />
            )
              : (
              <ScrollView>
                {this.state.Containers.map((container) => <Containers make contain={container} />)}
              </ScrollView>
              )}
        </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(InBoard);
