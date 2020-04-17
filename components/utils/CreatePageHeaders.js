import React, { Component } from 'react';
import {
  View, Text, AsyncStorage, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { LogoutAuth } from '../Redux/Reducer';

class Header extends Component {
   logout = async () => {
     await AsyncStorage.removeItem('user_Token');
     this.props.logout();
   };

   render() {
     return (
       console.log('props', this.props),
            <View>
                <Text>
                {this.props.title}
                </Text>
                <TouchableOpacity
                onPress={this.logout}>
                <Text>
                logout
                </Text>
                </TouchableOpacity>
            </View>
     );
   }
}
const mapStateToProps = ({ token }) => ({
  token,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutAuth());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
