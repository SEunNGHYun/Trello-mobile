import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { today, tomorrow } from '../utils/Date';

export default class Picker_Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: false,
      date: false,
      saveDate: null,
      saveTime: null,
    };
    this.date = {
      today,
      tomorrow,
    };
  }

  setDate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { today } = this.date;
    console.log('today', today);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Due Date</Text>
        <View>
        <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'today', value: today },
          { label: 'tomorrow', value: tomorrow },
          { label: 'next 토요일', value: 'hockey' },
          { label: 'pick a date', value: 'date' },
        ]}
        />
        {/* <RNPickerSelect /> */}
        </View>
        <Text>Set Reminder</Text>
        {/* <RNPickerSelect /> */}
        <Text>
          Reminders will be sent to all members and watchers of this card
        </Text>
        <View style={{ flexDirection: 'row' }}>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={new Date(1598051730000)}
          mode="date"
          is24Hour
          display="calendar"
          onChange={(val) => this.setDate('saveDate', val)} />
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={new Date(1598051730000)}
          mode="time"
          is24Hour
          display="clock"
          onChange={(val) => this.setDate('saveTime', val)} />
        <Button
        title="cnacel"
        type="clear"
        onPress={() => this.setState({ dateModal: !this.state.dateModal })} />
        <Button
        title="done"
        type="clear"
        onPress={() => this.cardServerToss} />
        </View>
        </View>
    );
  }
}
