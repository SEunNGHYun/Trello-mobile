import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { data } from '../fakedata';
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
    console.log('text', text);
    this.setState({
      containerTitle: text,
    });
  }

  MakeContainer = () => {
    console.log('enter Press');
    const containerContents = { title: this.state.containerTitle };
    this.props.ContainerTitle(data(containerContents.title));
    this.setState({
      addtoggle: true,
    });
    // axios.post(`${server}/container/create?board_id=${this.props.boardId}`, containerContents)
    //   .then((Res) => {

    //   });
  }

  render() {
    console.log(this.state);
    return (
    <View style={styles.container}>
      {this.state.addtoggle ? (
      <TextInput
      placeholder="title"
      onChangeText={(text) => this.ChangeInput(text)}
      onSubmitEditing={this.MakeContainer}
       />
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
