import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class MakeContainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addtoggle: false,
      containerTitle: '',
    };
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
    console.log('enter Press', this.props.boardId);
    const containerContents = { title: this.state.containerTitle   };
    if (containerContents.title.length > 0) {
      this.setState({
        addtoggle: false,
        containerTitle: '',
      });
      axios.post(`${server}/containers/${this.props.boardId}`, containerContents, { headers: { authorization: this.props.token } })
        .then((Res) => {
          if (Res.status > 200) {
            this.props.addContainer(Res.data.create);
          }
        });
    } else {
      this.setState({
        ...this.state,
        addtoggle: false,
      });
    }
  }

  render() {
    return (
    <View style={styles.container}>
      {this.state.addtoggle ? (
      <TextInput
      placeholder="title"
      style={styles.Input}
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
  Input: {
    width: Dimensions.get('window').width - 110,
    height: 50,
    backgroundColor: 'white',
  },
  container: {
    margin: 10,
    marginRight: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 95,
    height: 50,
    paddingLeft: 10,
  },
  TitleSize: {
    fontSize: 25,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(MakeContainers);
