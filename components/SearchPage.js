import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import axios from 'axios';
import { Header, Icon, Input } from 'react-native-elements';

function SearchPage(props) {
  const [val, setVal] = useState('');

  return (
    console.log('val', val),
        <View style={{ flex: 1 }}>
        <Header
        containerStyle={styles.header}
        leftComponent={(
            <TouchableOpacity
            style={{ marginBottom: 30.5 }}
            onPress={() => props.navigation.goBack()}>
            <Icon type="feather" name="arrow-left" color="white" size={27} />
            </TouchableOpacity>
            )}
        centerComponent={(
        <Input
        placeholder="Search..."
        leftIcon
        containerStyle={styles.searchBar}
        onChangeText={setVal}
        value={val} />
        )} />
        <View style={styles.others} />
        </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
  },
  others: { flex: 9 },
  searchBar: { marginLeft: 30, width: Dimensions.get('window').width - 60, marginBottom: 20 },
});

export default SearchPage;
