import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, AsyncStorage, TextInput,
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import RNdialog from 'react-native-dialog';
import RNmodal from 'react-native-modal';
import { server } from '../utils/server';
import Simple_Header from '../Headers/SimpleHeader';
import { LogoutAuth } from '../Redux/Reducer';


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userName: null,
        userEmail: null,
      },
      functionList: ['Logout', 'Edit', 'Delete'],
      editBool: false,
      deleteBool: false,
      editPass: null,
      editName: null,
    };
  }

  componentDidMount() {
    // axios.get(`${server}/user`, { headers: { authorization: this.props.token } })
    //   .then((Res) => this.setState({ userData: Res.data }));

    this.setState({
      userData: { userName: 'yun', userEmail: 'ysh122@gmail.com' },
    });
  }

  submitEditData = () => {
    const editData = { password: this.state.editPass, name: this.state.editName };
    this.setState({
      ...this.state,
      userData: { ...this.state.userData, userName: editData.name },
      editBool: false,
    });
    // axios.patch(`${server}/user/edit`, editData, { headers: { authorization: this.props.token } })
    //   .then((Res) => {
    //     if (Res.status === 201) {
    //       this.setState({
    //         ...this.state,
    //         userData: { ...this.state.userData, userName: editData.name },
    //         editBool: false,
    //       });
    //     }
    //   });
  }

  Delete = () => {
    this.props.logout();
    // axios.delete(`${server}/user/delete`, { headers: { authorization: this.props.token } })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       this.props.logout();
    //     }
    //   });
  }

  funcExecution = (classify) => {
    if (classify === 'Logout') {
      this.props.logout();
    } else if (classify === 'Delete') {
      this.setState({
        ...this.state,
        deleteBool: true,
      });
    } else if (classify === 'Edit') {
      this.setState({
        ...this.state,
        editBool: true,
      });
    }
  }

  render() {
    const { userName, userEmail } = this.state.userData;
    return (
            <View style={{ flex: 1 }}>
              <Header
              containerStyle={{
                height: 55,
              }}
              leftComponent={(
              <TouchableOpacity
              style={{ marginBottom: 30.5 }}
              onPress={() => this.props.navigation.goBack()}>
                <Icon type="feather" name="arrow-left" color="white" size={27} />
              </TouchableOpacity>
              )} />
                <View style={styles.userInfo}>
                  <View style={styles.userNameCircle}>
                <Text style={styles.username}>
                  {userName}
                </Text>
                  </View>
                <Text style={styles.useremail}>
                  {userEmail}
                </Text>
                </View>
                <View style={{ flex: 8 }}>
                {this.state.functionList.map((func) => (
                  <View>
                    <TouchableOpacity
                    key={func}
                    onPress={() => this.funcExecution(func)}>
                      <Text style={styles.funcFont}>
                        {func}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.Line} />
                  </View>
                ))}
                </View>
                <RNdialog.Container visible={this.state.deleteBool}>
                  <RNdialog.Title>회원 탈퇴</RNdialog.Title>
                  <RNdialog.Description>
                    진짜?
                  </RNdialog.Description>
                  <RNdialog.Button label="Cancel" onPress={() => this.setState({ deleteBool: false })} />
                  <RNdialog.Button label="Delete" onPress={this.Delete} />
                </RNdialog.Container>
                <RNmodal
                visible={this.state.editBool}>
                  <View style={styles.modal}>
                    <Text>
                      Edit
                    </Text>
                    <TextInput
                      placeholder="Name"
                      onChangeText={(text) => this.setState({ editName: text })} />
                    <TextInput
                      placeholder="Password"
                      onChangeText={(text) => this.setState({ editPass: text })}
                    />
                      <View style={styles.modalButtons}>
                      <Button type="clear" title="submit" onPress={this.submitEditData} />
                      <Button type="clear" title="cancel" onPress={() => this.setState({ editBool: false })} />
                      </View>
                  </View>
                </RNmodal>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  userInfo: {
    flex: 2.5,
    paddingLeft: 10,
    backgroundColor: 'purple',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  username: {
    fontSize: 20,
    marginTop: 10,
  },
  useremail: {
    fontSize: 20,
  },
  funcFont: {
    fontSize: 25,
    marginBottom: 10,
  },
  Line: {
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 1,
    opacity: 0.6,
  },
  userNameCircle: {
    marginTop: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 85,
  },
  modal: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row-reverse',
  },
});

const mapStatesToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutAuth());
  },
});

export default connect(mapStatesToProps, mapDispatchToProps)(UserPage);
