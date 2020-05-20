import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header, Icon, Input } from 'react-native-elements';
import { debounce } from 'lodash';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: null };
    this.searchInputValue = debounce(this.Debounce, 500);
  }


  Debounce(value) {
    axios.post(`search/${value}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        this.setState(
          { searchValue: res.date },
        );
      });
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
        <Header
        containerStyle={styles.header}
        leftComponent={(
            <TouchableOpacity
            style={{ marginBottom: 30.5 }}
            onPress={() => this.props.navigation.goBack()}>
            <Icon type="feather" name="arrow-left" color="white" size={27} />
            </TouchableOpacity>
            )}
        centerComponent={(
        <Input
        placeholder="Search..."
        containerStyle={styles.searchBar}
        onChangeText={this.searchInputValue} />
        )} />
        <View style={styles.others} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
  },
  others: { flex: 9 },
  searchBar: { marginLeft: 30, width: Dimensions.get('window').width - 60, marginBottom: 20 },
});
const mapStateToProps = ({ token }) => ({ token });
export default connect(mapStateToProps)(SearchPage);
