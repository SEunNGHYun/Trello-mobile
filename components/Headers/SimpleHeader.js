import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';


class Simple_Header extends Component {
  render() {
    const { title } = this.props;
    return (
            <View
            style={styles.CardTitle}>
                <TouchableOpacity
                style={styles.Icon}
                onPress={() => this.props.navigation.goBack()}>
                    <Icon type="feather" name="arrow-left" color="white" size={30} />
                </TouchableOpacity>
                <View style={{ marginTop: 35, width: title.length * 30, marginLeft: 10 }}>
                    <Text style={{ fontSize: 40 }}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  CardTitle: {
    flex: 1,
    marginBottom: 10,
  },
  Icon: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
});

export default Simple_Header;
