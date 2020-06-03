import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  CheckBox, Icon, Button, Header,
} from 'react-native-elements';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import Simple_Header from '../Headers/SimpleHeader';
import { server } from '../utils/server';
import ModelContents from '../MakeSeries/Picker_Date';
import { changeDate } from '../utils/Date';


class Card_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      describe: null,
      checkboxText: null,
      togglelable: false,
      lablelist: ['black', 'yellow', 'purple', 'green'],
      toggleMember: false,
      toggleDate: false,
      toggleAtt: false,
      showCheckbox: false,
      CheckboxListShow: false,
      Checklist: [],
      ChoiceDate: null,
      ChoiceLable: [],
    };
  }


  componentDidMount() {
    axios.get(`${server}/card/container_id=${this.props.container_id}`, { headers: { authorization: this.props.token } })
      .then((res) => this.setState({ describe: res.data.describe }))
      .catch(() => {
         ('에렁');
      });
  }

  choiceDate = (date, time) => {
    const PickDate = changeDate(date, time);
    this.setState({
      ChoiceDate: PickDate,
    });
  }

  checkboxTitle = (text) => {
    this.setState({ checkboxText: text });
  }

  choiceLable = (lable) => {
    const lables = this.state.ChoiceLable.concat([lable]);
    this.setState({
      ChoiceLable: lables,
    });
  }

  CheckIcon = (title) => {
    const newCheklist = this.state.Checklist.map((list) => {
      if (list.title === title) {
        list.checked = !list.checked;
      }
      return list;
    });
    this.setState({
      Checklist: newCheklist,
    });
  }

  addCheckbox = () => {
    let bool = true;
    this.state.Checklist.forEach((data) => {
      if (data.title === this.state.checkboxText) {
        bool = false;
      }
    });
    if (bool) {
      const list = this.state.Checklist.concat([{ title: this.state.checkboxText, checked: false }]);
      this.setState({
        ...this.state,
        Checklist: list,
        checkboxText: null,
      });
    } else {
      this.setState({
        ...this.state,
        checkboxText: null,
      });
    }
  }

  render() {
    const { title } = this.props.route.params;
    return (
            <View style={styles.Card}>
              <Header
              containerStyle={styles.Card_title}
              leftComponent={<Simple_Header navigation={this.props.navigation} title={title} />} />
              <ScrollView style={styles.Card_details}>
                <TextInput
                  placeholder="describe"
                  value={this.state.describe}
                  onChangeText={(val) => this.setState({ describe: val })}
                  clearButtonMode="while-editing"
                />
                <View>
                <TouchableOpacity
                  style={styles.Card_funcs}
                  onPress={() => this.setState({ togglelable: !this.state.togglelable })}>
                  <Icon
                    type="feather"
                    name="tag" />
                  <Text style={styles.Card_funcs_font}>
                    label ...
                  </Text>
                </TouchableOpacity>
                {this.state.ChoiceLable.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.ChoiceLable.map((lable) => (
                      <View style={{
                        margin: 5, width: 40, height: 40, backgroundColor: lable, paddingLeft: 3,
                      }} />
                    ))}
                  </View>
                )}
                {this.state.togglelable && (
                <View style={styles.Card_lable_View}>
                  {this.state.lablelist.map((lable) => (
                  <TouchableOpacity
                  style={{
                    margin: 10, width: '95%', height: 40, backgroundColor: lable,
                  }}
                  onPress={() => this.choiceLable(lable)} />
                  ))}
                </View>
                )}
                <TouchableOpacity
                  style={styles.Card_funcs}
                  onPress={() => this.setState({ toggleMember: !this.state.toggleMember })}>
                  <Icon
                    type="feather"
                    name="user" />
                  <Text style={styles.Card_funcs_font}>
                    Member ...
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
                  style={styles.Card_funcs}
                  onPress={() => this.setState({ toggleDate: !this.state.toggleDate })}>
                    <Icon
                    type="feather"
                    name="calendar" />
                  <Text style={styles.Card_funcs_font}>
                    Due Date ...
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.toggleDate}>
                    <ModelContents closeModal={() => this.setState({ toggleDate: false })} detail ChangeDate={this.choiceDate} />
                </Modal>
                <TouchableOpacity
                  style={styles.Card_funcs}
                  onPress={() => this.setState({ showCheckbox: !this.state.showCheckbox })}>
                    <Icon
                    type="feather"
                    name="check-square" />
                  <Text style={styles.Card_funcs_font}>
                    Checklist ...
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Card_funcs}
                  onPress={() => this.setState({ toggleAtt: !this.state.toggleAtt })}>
                    <Icon
                    type="feather"
                    name="paperclip" />
                  <Text style={styles.Card_funcs_font}>
                    Attachment ...
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
                  <TouchableOpacity
                  style={styles.Card_Checklist}
                  onPress={() => this.setState({ CheckboxListShow: !this.state.CheckboxListShow })}>
                      <Icon
                      type="feather"
                      name="check-square" />
                      <Text style={styles.Card_Checklist_font}>CheckList</Text>
                  </TouchableOpacity>
                    {this.state.CheckboxListShow && (
                    <View style={styles.checkList}>
                      {this.state.Checklist.map((checkbox) => (
                        <CheckBox
                          title={checkbox.title}
                          checked={checkbox.checked}
                          onIconPress={() => this.CheckIcon(checkbox.title)} />
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
    backgroundColor: 'blue',
  },
  Card_title: {
    flex: 0.5,
    backgroundColor: '#7ed3fc',
  },
  Card_Checklist: {
    backgroundColor: 'white',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Card_Checklist_font: {
    fontSize: 20,
    marginLeft: 5,
  },
  Card_details: {
    flex: 8,
    backgroundColor: 'white',
  },
  Card_lable_View: {
    backgroundColor: 'gray',
    width: '100%',
  },
  Card_funcs: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  Card_funcs_font: {
    fontSize: 15,
    margin: 3,
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
  checkList: {
    flex: 5,
    backgroundColor: 'gray',
  },
});
const mapStateToProps = ({ token, cardDate }) => ({
  token,
  cardDate,
});
export default connect(mapStateToProps)(Card_detail);
