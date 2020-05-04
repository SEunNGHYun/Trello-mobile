import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Card_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
            <View style={styles.Card}>
                <Text>Card detail</Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
  },
});

export default Card_detail;
