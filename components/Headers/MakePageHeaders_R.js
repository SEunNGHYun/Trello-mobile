import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

function MakePageHeader_R({
  able, where, title, create, CardToss,
}) {
  return (
        <TouchableOpacity
        style={styles.Done}
        enabled={where === 'Board' ? title.length > 0 : able}
        onPress={where === 'Board' ? create : CardToss}>
          <Icon type="material" name="done" color={where === 'Board' ? (title.length > 0 ? 'white' : 'gray') : (able ? 'white' : 'gray')} />
        </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  Done: { marginBottom: 30, marginRight: 20 },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(MakePageHeader_R);
