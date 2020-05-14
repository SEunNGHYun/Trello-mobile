import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';
import Axios from 'axios';
import { SaveCardDate } from '../Redux/Reducer';
import {
  today, tomorrow, nextWeek, nextWeekDay,
} from '../utils/Date';
import { server } from '../utils/server';

class Picker_Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: false,
      date: false,
      saveDate: null,
      saveTime: null,
      saveAlarm: null,
    };
  }

  SelectPicker = (key, val) => {
    if (key === 'Date') {
      if (val === 'date') {
        this.setState({
          ...this.state,
          date: true,
        });
      } else {
        this.setState({
          ...this.state,
          saveDate: val,
        });
      }
    } else if (key === 'Time') {
      if (val === 'time') {
        this.setState({
          ...this.state,
          time: true,
        });
      } else {
        this.setState({
          ...this.state,
          saveTime: val,
        });
      }
    } else if (key === 'Alarm') {
      this.setState({
        ...this.state,
        saveAlarm: val,
      });
    }
  }


  cardDataToss = () => {
    const cardData = { date: this.state.saveDate, time: this.state.saveTime, alarm: this.state.saveAlarm };

    this.props.SaveCardDate(cardData);
    this.props.closeModal();
  }

  SaveDate = (key, value) => {
    if (key === 'date') {
      this.setState({
        ...this.state,
        saveDate: value,
        date: false,
        time: false,
      });
    } else if (key === 'time') {
      this.setState({
        ...this.state,
        saveTime: value,
        date: false,
        time: false,
      });
    }
  }

  Change_Card_Info = () => {
    const { saveDate, saveTime } = this.state;
    this.props.ChangeDate(saveDate, saveTime);
    this.props.closeModal();
  }

  render() {
    const { time, date } = this.state;
    return (
        <View style={styles.Modal}>
        <Text>Due Date</Text>
        <View>
        <RNPickerSelect
        style={styles.picker}
        onValueChange={(value) => this.SelectPicker('Date', value)}
        items={[
          { label: 'today', value: today },
          { label: 'tomorrow', value: tomorrow },
          { label: `next ${nextWeekDay}`, value: nextWeek },
          { label: 'pick a date', value: 'date' },
        ]}
        />
        <RNPickerSelect
        style={styles.picker}
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
        onValueChange={(value) => this.SelectPicker('Alarm', value)}
        items={[
          { label: '5 minutes before', value: '5M' },
          { label: '10 minutes before', value: '10M' },
          { label: '15 minutes before', value: '15M' },
          { label: '1 hours before', value: '1H' },
          { label: '2 hours before', value: '2H' },
          { label: '1 Days before', value: '1D' },
          { label: '2 Days before', value: '2D' },
        ]} />
        <Text>
          Reminders will be sent to all members and watchers of this card
        </Text>
        <View style={{ flexDirection: 'row' }}>
        <DateTimePickerModal
          isVisible={date}
          value={new Date()}
          mode="date"
          onCancel={() => this.setState({ date: false })}
          onConfirm={(value) => this.SaveDate('date', value)} />
        <DateTimePickerModal
          isVisible={time}
          mode="time"
          value={new Date()}
          is24Hour
          onCancel={() => this.setState({ time: false })}
          onConfirm={(value) => this.SaveDate('time', value)} />
          <View style={styles.buttons}>
        <Button
        title="cnacel"
        type="clear"
        onPress={() => this.props.closeModal()} />
        <Button
        title="done"
        type="default"
        onPress={this.props.detail ? this.Change_Card_Info : this.cardDataToss} />
          </View>
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  Modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 350,
    height: 300,
  },
  picker: {
    width: 100,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

const mapDispatchToProps = (dispatch) => ({
  SaveCardDate: (date) => {
    dispatch(SaveCardDate(date));
  },
});

export default connect(null, mapDispatchToProps)(Picker_Date);
