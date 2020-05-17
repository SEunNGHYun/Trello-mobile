import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomHeader_Left extends Component {
  render() {
    return (
            <View style={{ flexDirection: 'row', marginBottom: 14 }}>
                <Icon type="feather" name="menu" color="white" />
                <Text style={{
                  fontSize: 24, color: 'white', marginLeft: 7,
                }}>
                    {this.props.title}
                </Text>
            </View>
    );
  }
}
