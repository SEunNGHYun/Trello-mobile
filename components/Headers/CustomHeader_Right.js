import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomHeader_Right extends Component {
  render() {
    return (
            <View style={{
              flexDirection: 'row', alignItems: 'center', marginBottom: 22,
            }}>
                <TouchableOpacity
                onPress={() => console.log('뿅')}
                style={{ marginRight: 20 }}>
                <Icon
                type="feather"
                name="search"
                color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => console.log('뿅')}
                style={{ marginRight: 10 }}>
                <Icon
                type="feather"
                name="bell"
                color="white" />
                </TouchableOpacity>
            </View>
    );
  }
}
