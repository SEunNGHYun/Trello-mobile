import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from './utils/server';
import { LogoutAuth } from './Redux/Reducer';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userName: null,
        userEmail: null,
      },
      editBool: false,
      deleteBool: false,
    };
  }

  componentDidMount() {
    axios.get(`${server}/user`, { headers: { authorization: this.props.token } })
      .then((Res) => this.setState({ userData: Res.data }));
  }

  logout = () => {
    this.props.logout();
    AsyncStorage.removeItem('user_Token');
  }

  edit = () => {

  }

  delete = () => {
    this.props.logout();
  }

  render() {
    const { userName, userEmail } = this.state.userData;
    return (
            <View>
                <View />
                <Text style={styles.username}>
                  {userName}
                </Text>
                <Text style={styles.useremail}>
                  {userEmail}
                </Text>
                <TouchableOpacity onPress={this.logout}>
                  <Text>
                    Logut
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>
                    Delete
                  </Text>
                </TouchableOpacity>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  username: {
    fontSize: 40,
  },
  useremail: {
    fontSize: 15,
  },
});

const mapStatesToProps = ({ token }) => {
  token;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutAuth());
  },
});

export default connect(mapStatesToProps, mapDispatchToProps)(UserPage);
