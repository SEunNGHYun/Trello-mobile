import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';

function MakePageHeader_L({ navigation, title }) {
  return (
      <View
      style={styles.Header_L}>
          <TouchableOpacity
          style={styles.Icon}
          onPress={() => navigation.goBack()}>
              <Icon type="feather" name="x" color="white" size={30} />
          </TouchableOpacity>
          <View style={{ width: title.length * 30 }}>
              <Text style={{ fontSize: 20, color: 'white' }}>
                  {title}
              </Text>
          </View>
      </View>
  );
}
const styles = StyleSheet.create({
  Header_L: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  Icon: {
    marginRight: 10,
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(MakePageHeader_L);
