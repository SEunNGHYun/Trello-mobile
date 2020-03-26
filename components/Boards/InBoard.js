import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, AsyncStorage,
} from 'react-native';
import Axios from 'axios';
import { Button } from 'react-native-elemets';
import { server } from '../utils/server';
import Containers from '../Containers/Containers';

class InBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Containers: [],
    };
  }

  async componentDidMount() {
    const auth = await AsyncStorage.getItem('user_Token');
    Axios.get(`${server}/container?board_id=${this.props.id}`, { headers: { authorization: auth } })
      .then((Res) => {
        console.log('RES', Res);
        this.setState({
          Containers: Res.data,
        });
      });
  }

  render() {
    return (
        <View>
            { this.state.Containers.length === 0 ? (
                <>
               <Text>
                   비었습니다.
               </Text>
               <Button onPress={() => this.navigation.navigate('MakContainer')} />
                </>
            )
              : (<ScrollView />)}
        </View>
    );
  }
}
const styles = StyleSheet.create({

});

export default InBoard;
