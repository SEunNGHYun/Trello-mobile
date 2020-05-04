import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Basic_Header extends Component {
  render() {
    return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
    );
  }
}

export default Basic_Header;

