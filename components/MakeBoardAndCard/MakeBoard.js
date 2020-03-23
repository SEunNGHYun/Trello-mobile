import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MakeBoard extends Component {
  render() {
    return (
        <View style={styles.total}>
            <Text>Board 만드는 곳</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'red',
  },
});
export default MakeBoard;
