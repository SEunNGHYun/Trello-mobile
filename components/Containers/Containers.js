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

  giveCardData = (val) => {
    
  }

  render() {
    const { contain } = this.props;
    console.log('contain', contain);
    return (
      <View style={styles.Container}>
        <View style={styles.Cotianertitle}>
        <Text style={{ fontSize: 40, color: 'black' }}>
          {contain.title}
        </Text>
        <Icon
        type="feather"
        name="more-vertical" />
        </View>
        <ScrollView
        style={styles.CardList}>
          {this.state.CardList.map((card) => (
            <TouchableOpacity><Text>{card.title}</Text></TouchableOpacity>
          ))}
        </ScrollView>
        {this.state.AddCardBool ? (
        <TextInput
        onChangeText={this.giveCardData}
        autoFocus
        onSubmitEditing={() => this.setState({ ...this.state, AddCardBool: false })}
        />
        ) : (
        <TouchableOpacity
          style={styles.AddCardButt}
          onPress={() => this.setState({ AddCardBool: true })}>
          <Text
            style={{ fontSize: 30, color: 'blue' }}>
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
    width: Dimensions.get('window').width - 95,
    marginRight: 30,
    margin: 10,
  },
  Cotianertitle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CardList: {
    backgroundColor: 'gray',
    margin: 10,
  },
  AddCardButt: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default Container;
