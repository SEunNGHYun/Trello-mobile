import React, { Component } from 'react';
import {
  View, Text, AsyncStorage, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { LogoutAuth } from '../Redux/Reducer';
import { server } from '../utils/server';

class Header extends Component {
  logout = async () => {
    await AsyncStorage.removeItem('user_Token');
    this.props.logout();
  };

  boardCreate() {
    const { boardTitleObj } = this.props;
    console.log('boardTitle', boardTitleObj);
    //  axios.post(`${server}/board/create`,boardTitleObj, { headers: { authorization: this.props.token } );
    //  this.props.navigation.navigate('InBoard',  { id: res.data.id, name: res.data.title });
  }

  cardCreate() {
    const { cardInfo, containerId } = this.props;
    console.log('cardInfo', cardInfo);
    //  axios.post(`${server}/card/create?container_id=${containerId}`,cardInfo, { headers: { authorization: this.props.token } );
    this.props.navigation.navigate('Home');
  }

  render() {
    const { create } = this.props;
    console.log('this.props', this.props.cardInfo);
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
                    onPress={() => (create === 'Board' ? this.boardCreate() : this.cardCreate())}>
                      <Icon type="material" name="done" />
                    </TouchableOpacity>
                  )
                  : (
                  <TouchableOpacity
                    style={styles.headerRight}
                    onPress={this.props.navigation.openDrawer}>
                    <Icon
                    type="material"
                    name="reorder" />
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
const mapStateToProps = ({
  token, boardTitleObj, cardName, cardDescription, cardDate, containerId,
}) => ({
  token,
  boardTitleObj,
  cardInfo: {
    name: cardName,
    describe: cardDescription,
    date: cardDate,
  },
  containerId,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutAuth());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
