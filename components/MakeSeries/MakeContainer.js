import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class MakeContainers extends React.Component {
  state = {
    addtoggle: false,
    containerTitle: '',
  }

  toggleAdd =() => {
    this.setState({
      addtoggle: true,
    });
  }

  ChangeInput = (text) => {
    this.setState({
      containerTitle: text,
    });
  }

  MakeContainer = () => {
    const containerContents = { title: this.state.containerTitle };
    axios.post(`${server}/container/create?board_id=${this.props.boardId}`, containerContents)
      .then((Res) => {
        this.props.ContainerTitle(this.state.containerTitle);
      });
  }

  render() {
    console.log(this.state);
    return (
    <View style={styles.container}>
      {this.state.addtoggle ? (
      <TextInput
      onChangeText={this.onChange}
      onKeyPress={this.MakeContainer} />
      ) : (
        <TouchableOpacity onPress={this.toggleAdd}>
        <Text style={styles.TitleSize}>
          + Add Container
        </Text>
        </TouchableOpacity>
      )}
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  TitleSize: {
    fontSize: 30,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(MakeContainers);
