import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { CheckBox, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { server } from '../utils/server';
import ModelContents from '../MakeSeries/Picker_Date';


class Card_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      describe: null,
      checkboxText: null,
      toggleCheckbox: false,
      togglelable: false,
      lablelist: ['black'],
      toggleMember: false,
      toggleDate: false,
    };
  }

  componentDidMount() {
    // axios.get(`${server}/card/container_id=${this.props.container_id}`, { headers: { authorization: this.props.token } })
    //   .then((res) => this.setState({ describe: res.data.describe }));
  }

  render() {
    console.log('this.', this.state.toggleDate);
    const { title } = this.props.route.params;
    return (
            <View style={styles.Card}>
              <View style={styles.Card_title}>
                <Text
                style={{ fontSize: 30 }}>{title}
                </Text>
              </View>
              <View style={styles.Card_details}>
                <TextInput
                  placeholder="describe"
                  value={this.state.describe}
                  onChangeText={(val) => this.setState({ describe: val })}
                />
                <ScrollView>
                <TouchableOpacity
                  onPress={() => this.setState({ togglelable: !this.state.togglelable })}>
                  <Text>
                    label
                  </Text>
                </TouchableOpacity>
                {this.state.togglelable ? (
                <View style={styles.Card_lable_View}>
                  {this.state.lablelist.map((lable) => (
                  <View style={{
                    margin: 10, width: 40, height: 20, backgroundColor: lable,
                  }} />
                  ))}
                </View>
                ) : <View />}
                <TouchableOpacity
                  onPress={() => this.setState({ toggleDate: !this.state.toggleDate })}>
                  <Text>
                    Due Date
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.toggleDate}>
                    <ModelContents closeModal={() => this.setState({ toggleDate: false })} />
                </Modal>
                {/* <View>
                  <TextInput
                  multiline
                  onChangeText={this.setState((text) => this.setState({ checkboxText: text }))}
                  onSubmitEditing={() => this.setState({ toggleCheckbox: false })}
                  /> */}
                </ScrollView>
              </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
  },
  Card_title: {
    flex: 3,
    backgroundColor: 'blue',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  Card_details: {
    flex: 8,
    backgroundColor: 'green',
  },
  Card_lable_View: {
    backgroundColor: 'gray',
    width: '100%',
  },
  Card_Modal_Date: {
    backgroundColor: 'white',
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});
export default connect(mapStateToProps)(Card_detail);
