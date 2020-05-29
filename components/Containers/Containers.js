import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CardList: [],
      AddCardBool: false,
      AddCardTitle: '',
      container_id: null,
    };
  }

  componentDidMount() {
    axios.get(`${server}/cards/list/${this.props.boardId}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        this.setState({ CardList: res.data.cards, container_id: res.data.id });
      });
  }

  giveCardData = () => {
    const cardTitle = { title: this.state.AddCardTitle };
    axios.post(`${server}/cards/${this.props.boardId}`, cardTitle, { headers: { authorization: this.props.token } })
      .then((res) => {
        console.log('Res', res.data);
        if (res.status > 200) {
          this.setState({
            ...this.state,
            CardList: this.state.CardList.concat(res.data),
            AddCardTitle: '',
            container_id: res.data.id,
          });
        }
      });
  }

  render() {
    const { contain } = this.props;
    console.log('contain');
    return (
      <View style={styles.Container}>
        <View style={styles.Contianer_title_Icon}>
        <View style={styles.Title}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {contain.title}
        </Text>
        </View>
        <View style={{ paddingTop: 11 }}>
        <Icon
        type="feather"
        name="more-vertical" />
        </View>
        </View>
        <ScrollView
        style={this.state.CardList.length === 0 ? styles.Length_is_Zero : styles.Length_is_over_Zero}>
          {this.state.CardList.length > 0 && this.state.CardList.map((card) => (
            <TouchableOpacity
            key={card.id ? card.id : card.title}
            style={styles.One_Card_list}
            onPress={() => this.props.navigation.navigate('Card_Detail', { title: card.title, container_id: this.state.container_id })}>
              <Text style={{ fontSize: 20 }}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {this.state.AddCardBool ? (
        <TextInput
        placeholder="Card title"
        style={styles.Card_Input}
        onChangeText={(val) => this.setState({ ...this.state, AddCardTitle: val })}
        onSubmitEditing={this.giveCardData}
        />
        ) : (
        <TouchableOpacity
          style={styles.AddCardButt}
          onPress={() => this.setState({ AddCardBool: true })}>
          <Text
            style={{ fontSize: 20, color: 'blue' }}>
            Add Card
          </Text>
        </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: Dimensions.get('window').width - 80,
    marginRight: 30,
    margin: 10,
  },
  Contianer_title_Icon: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Title: {
    width: Dimensions.get('window').width - 110,
  },
  Length_is_Zero: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width - 80,
    height: 40,
  },
  Length_is_over_Zero: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width - 80,
  },
  AddCardButt: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  Card_Input: {
    backgroundColor: 'white',
  },
  One_Card_list: {
    margin: 10,
    paddingLeft: 3,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
});
const mapStatestoPrope = ({ token }) => ({
  token,
});
export default connect(mapStatestoPrope)(Container);
