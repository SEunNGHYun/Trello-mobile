import React, { Component } from 'react';
import {
  View, Text, AsyncStorage, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { LogoutAuth } from '../Redux/Reducer';
import { server } from './server';

class Header extends Component {
   logout = async () => {
     await AsyncStorage.removeItem('user_Token');
     this.props.logout();
   };

   boardCreate() {
     const { boardTitleObj } = this.props;
     console.log('boardTitle', boardTitleObj);
     //  axios.post(`${server}/board/create`,, { headers: { authorization: this.props.token } );
     //  this.props.navigation.navigate('InBoard');
   }

   cardCreate() {

   }

   render() {
     const { create, board } = this.props;
     return (
            <View style={styles.headerTotal}>
              <View style={styles.headerLeft}>
                <Text>
                {this.props.title}
                </Text>
              </View>
                {create
                  ? (
                    <TouchableOpacity
                    style={styles.logout}
                    onPress={() => (create ? this.boardCreate() : this.cardCreate())}>
                      <Icon type="material" name="done" />
                    </TouchableOpacity>
                  )
                  : (
                  <TouchableOpacity
                    style={styles.headerRight}
                    onPress={this.logout}>
                    <Text>
                    logout
                    </Text>
                  </TouchableOpacity>
                  ) }
            </View>
     );
   }
}
const styles = StyleSheet.create({
  headerTotal: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  logout: {
    marginLeft: 200,
  },
  headerRight: {
    marginLeft: 300,
  },
  headerLeft: {
    marginRight: 1,
  },
});
const mapStateToProps = ({ token, boardTitleObj }) => ({
  token,
  boardTitleObj,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutAuth());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
