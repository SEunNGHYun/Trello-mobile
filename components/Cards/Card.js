import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { CheckBox, Icon, Button } from 'react-native-elements';
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
      togglelable: false,
      lablelist: ['black'],
      toggleMember: false,
      toggleDate: false,
      toggleAtt: false,
      showCheckbox: false,
      CheckboxListShow: false,
      Checklist: [],
    };
  }


  componentDidMount() {
    // axios.get(`${server}/card/container_id=${this.props.container_id}`, { headers: { authorization: this.props.token } })
    //   .then((res) => this.setState({ describe: res.data.describe }));
  }

  checkboxTitle = (text) => {
    this.setState({ checkboxText: text });
  }

  addCheckbox = () => {
    const list = this.state.Checklist.concat([{ title: this.state.checkboxText, checked: false }]);
    this.setState({
      Checklist: list,
      checkboxText: null,
      showCheckbox: true,
    });
  }

  render() {
    console.log('this.state', this.state.Checklist.length > 0);
    const { title } = this.props.route.params;
    return (
            <View style={styles.Card}>
              <View style={styles.Card_title}>
                <Text
                style={{ fontSize: 30 }}>{title}
                </Text>
              </View>
              <ScrollView style={styles.Card_details}>
                <TextInput
                  placeholder="describe"
                  value={this.state.describe}
                  onChangeText={(val) => this.setState({ describe: val })}
                  clearButtonMode="while-editing"
                />
                <View>
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
                  onPress={() => this.setState({ toggleMember: !this.state.toggleMember })}>
                  <Text>
                    Member
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.toggleMember}>
                  <View style={styles.Card_Preparing}>
                    <Text>준비 중</Text>
                    <Button
                    type="outline"
                    title="Cancel"
                    onPress={() => this.setState({ toggleMember: false })} />
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => this.setState({ toggleDate: !this.state.toggleDate })}>
                  <Text>
                    Due Date
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.toggleDate}>
                    <ModelContents closeModal={() => this.setState({ toggleDate: false })} detail />
                </Modal>
                <TouchableOpacity
                  onPress={() => this.setState({ showCheckbox: !this.state.showCheckbox })}>
                  <Text>
                    Checklist
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ toggleAtt: !this.state.toggleAtt })}>
                  <Text>
                    Attachment
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.toggleAtt}>
                  <View style={styles.Card_Preparing}>
                    <Text>준비 중</Text>
                    <Button
                    type="outline"
                    title="Cancel"
                    onPress={() => this.setState({ toggleAtt: false })} />
                  </View>
                </Modal>
                {this.state.showCheckbox ? (
                <TextInput
                placeholder="Add checkbox title"
                value={this.state.checkboxText}
                onSubmitEditing={this.addCheckbox}
                clearButtonMode="while-editing"
                onChangeText={this.checkboxTitle} />
                )
                  : <View />}
                {this.state.Checklist.length > 0
                && (
                <View>
                  <TouchableOpacity onPress={() => this.setState({ CheckboxListShow: !this.state.CheckboxListShow })}>
                    <View>
                      <Text>CheckList</Text>
                    </View>
                  </TouchableOpacity>
                    {this.state.CheckboxListShow && (
                    <View style={styles.checkList}>
                      {this.state.Checklist.map((checkbox) => (
                        <CheckBox
                          title={checkbox.title}
                          checked={checkbox.checked}
                          onIconPress={(checkbox) => this} />
                      ))}
                    </View>
                    )}
                </View>
                )}
                </View>
              </ScrollView>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
  },
  Card_title: {
    flex: 0.5,
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
  Card_Preparing: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 300,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Card_Att_View: {
    backgroundColor: 'gray',
    width: '100%',
  },
  Card_Modal_Date: {
    backgroundColor: 'white',
  },
  checkList: {
    flex: 5,
    backgroundColor: 'red',
  },
});
const mapStateToProps = ({ token, cardDate }) => ({
  token,
  cardDate,
});
export default connect(mapStateToProps)(Card_detail);
