import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';
import { SaveCardDate } from '../Redux/Reducer';
import {
  today, tomorrow, nextWeek, nextWeekDay,
} from '../utils/Date';

class Picker_Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: false,
      date: false,
      saveDate: null,
      saveTime: null,
    };
  }

  SelectPicker = (key, val) => {
    if (key === 'Date') {
      if (val === 'date') {
        this.setState({ date: true });
      }
    } else if (key === 'Time') {
      if (val === 'time') {
        this.setState({
          time: true,
        });
      }
    }
  }

  SaveDate = (value) => {
    console.log('val', value);
    this.setState({
      ...this.state,
      date: false,
      time: false,
    });
  }

  render() {
    const { time, date } = this.state;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Due Date</Text>
        <View>
        <RNPickerSelect
        onValueChange={(value) => this.SelectPicker('Date', value)}
        items={[
          { label: 'today', value: today },
          { label: 'tomorrow', value: tomorrow },
          { label: `next ${nextWeekDay}`, value: nextWeek },
          { label: 'pick a date', value: 'date' },
        ]}
        />
        <RNPickerSelect
        onValueChange={(value) => this.SelectPicker('Time', value)}
        items={[
          { label: 'Moring', value: '오전 9:00' },
          { label: 'Afternoon', value: '오후 1:00' },
          { label: 'Evening', value: '오후 5:00' },
          { label: 'Night', value: '오후 8:00' },
          { label: 'Pick a Time', value: 'time' },
        ]} />
        </View>
        <Text>Set Reminder</Text>
        <RNPickerSelect
        onValueChange={(value) => this.SelectPicker('alarm', value)}
        items={[
          { label: '5 minutes before', value: { categorize: 'Min', val: 5 } },
          { label: '10 minutes before', value: { categorize: 'Min', val: 10 } },
          { label: '15 minutes before', value: { categorize: 'Min', val: 15 } },
          { label: '1 hours before', value: { categorize: 'hour', val: 1 } },
          { label: '2 hours before', value: { categorize: 'hour', val: 2 } },
          { label: '1 Days before', value: { categorize: 'Day', val: 1 } },
          { label: '2 Days before', value: { categorize: 'Day', val: 2 } },
        ]} />
        <Text>
          Reminders will be sent to all members and watchers of this card
        </Text>
        <View style={{ flexDirection: 'row' }}>
        <DateTimePickerModal
          isVisible={date}
          date={new Date()}
          mode="date"
          onCancel={() => this.setState({ date: false })}
          onConfirm={this.SaveDate} />
        <DateTimePickerModal
          isVisible={time}
          date={new Date()}
          mode="time"
          onCancel={() => this.setState({ time: false })}
          onConfirm={this.SaveDate} />
        <Button
        title="cnacel"
        type="clear"
        onPress={() => this.props.closeModal()} />
        <Button
        title="done"
        type="default"
        onPress={() => this.cardServerToss} />
        </View>
        </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  SaveCardDate: (date) => {
    dispatch(SaveCardDate(date));
  },
});

export default connect(null, mapDispatchToProps)(Picker_Date);
