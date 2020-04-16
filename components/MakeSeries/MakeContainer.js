import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class MakeContainer extends Component {
  state = {
    containerTitle: '',
  }

  createContainer = () => {
    axios.post(`${server}/container/create`, { headers: { authorization: this.props.token } });
  }

  render() {
    return (
            <View />
    );
  }
}

const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(MakeContainer);
