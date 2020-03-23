import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MakeCard extends Component {
  render() {
    return (
            <View style={styles.total}>
                <Text>
                    Card 만드는 곳
                </Text>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default MakeCard;
