import React, { Component } from 'react';
import { Icon, Header } from 'react-native-elements';
import {
  View, Text, StyleSheet,
} from 'react-native';

class Basic_Header extends Component {
  render() {
    return (

      <Header />
    // <View
    //   style={styles.header_theme}>
    //   <Icon
    //   type="" />
    //     <Text
    //     style={{ fontSize: 25 }}>{this.props.title}
    //     </Text>
    // </View>
    );
  }
}
const styles = StyleSheet.create({
  header_theme: {
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
});
export default Basic_Header;
