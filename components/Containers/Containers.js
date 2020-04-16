import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { server } from '../utils/server';

class Containers extends React.Component {
  state = {
    card: [],
  }

  componentDidMount() {
    axios.get(`${server}/card?container_id=${this.props.contain.id}`, { headers: { authorization: this.props.token } })
      .then((res) => {
        if (res.status > 200) {
          this.setState({
            card: res.data,
          });
        }
      });
  }

  render() {
    return (
    <View>
      <Text>
      Container 화면
      </Text>
    </View>
    );
  }
}
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(Containers);
