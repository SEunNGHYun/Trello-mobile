import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { server } from '../utils/server';
import MakeContainer from '../MakeSeries/MakeContainer';
import Containers from '../Containers/Containers';

class InBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Containers: [],
      ContainerTitle: '',
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

  ChangeContainerTitle = (createObj) => {
    console.log('createObj', createObj);
    const titles = this.state.Containers.concat(createObj);
    this.setState({
      Containers: titles,
    });
  }

  render() {
    console.log(this.state.Containers);
    const { id } = this.props.route.params;
    return (
        <View style={styles.total}>
            { this.state.Containers.length === 0 ? (
              <View style={styles.container}>
              <MakeContainer boardId={id} ContainerTitle={this.ChangeContainerTitle} />
              </View>
            )
              : (
              <ScrollView>
                <MakeContainer boardId={id} ContainerTitle={this.ChangeContainerTitle} />
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
