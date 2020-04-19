import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class Containers extends React.Component {
  state = {
    addtoggle: false,
    card: [],
    containerTitle: '',
  }

  componentDidMount() {
    axios.get(`${server}/card?container_id=${this.props.contain.id}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            card: res.data,
          });
        }
      });
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
    axios.post(`${server}/container/create?board_id=${this.props.boardId}`, containerContents);
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

export default connect(mapStateToProps)(Containers);
