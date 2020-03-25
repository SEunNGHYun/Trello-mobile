import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, AsyncStorage,
} from 'react-native';
import Axios from 'axios';
import { server } from '../utils/server';
import Containers from '../Containers/Containers';

class InBoard extends Component {
  componentDidMount() {
    Axios(`${server}`);
  }

  render() {
    return (
        <View>
            <ScrollView />
        </View>
    );
  }
}
const styles = StyleSheet.create({

});

export default InBoard;
