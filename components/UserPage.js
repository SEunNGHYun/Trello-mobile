import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from './utils/server';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    axios.get(`${server}/user`, { headers: { authorization: this.props.token } })
      .then((Res) => this.setState({ userData: Res.data }));
  }

  render() {
    return (
            <View>
                <View />
                <Text>
                    User Edit
                </Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({});
const mapStatesToProps = ({ token }) => {
  token;
};

export default connect(mapStatesToProps)(UserPage);
