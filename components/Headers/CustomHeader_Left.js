import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomHeader_Left({ navigation, title, InBoard }) {
  return (
            <View style={{
              flexDirection: 'row', alignItems: 'center', marginBottom: 22, width: title.length * 30,
            }}>
                {InBoard ? (
                <TouchableOpacity
                onPress={() => navigation.goBack()}>
                  <Icon type="feather" name="arrow-left" color="white" />
                </TouchableOpacity>
                )
                  : (
                  <TouchableOpacity
                onPress={() => navigation.openDrawer()}>
                <Icon
                type="feather"
                name="menu"
                color="white" />
                  </TouchableOpacity>
                  )}
                <Text style={{
                  fontSize: 22, color: 'white', marginLeft: 11,
                }}>
                    {title}
                </Text>
            </View>
  );
}
