import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Boardtitle({ title, id }) {
  return (
        <View style={styles.boardTitle}>
        <View style={styles.box} />
          <Text
            id={id}
            style={{ marginLeft: 10, fontSize: 20 }}>
              {title}
          </Text>
        </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    margin: 4,
    backgroundColor: '#0078D7',
    borderRadius: 10,
  },
  boardTitle: {
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Boardtitle;
