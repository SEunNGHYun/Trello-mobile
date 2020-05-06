import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { server } from '../utils/server';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CardList: [],
      AddCardBool: false,
      AddCardTitle: '',
    };
  }

  giveCardData = () => {
    const cardData = this.state.CardList.concat([{ title: this.state.AddCardTitle }]);
    this.setState({
      CardList: cardData,
      AddCardTitle: '',
      AddCardBool: false,
    });
  }

  render() {
    const { contain } = this.props;
    console.log('contain', contain);
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
          {this.state.CardList.map((card) => (
            <TouchableOpacity
            key={card.id ? card.id : card.title}
            style={styles.One_Card_list}
            onPress={() => this.props.navigation.navigate('Card_Detail', { title: card.title })}>
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

export default Container;
