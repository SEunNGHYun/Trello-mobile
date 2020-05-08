import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { server } from '../utils/server';
import MakeContainer from '../MakeSeries/MakeContainer';
import Container from '../Containers/Containers';

class InBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Containers: [],
      ContainerTitle: '',
    };
  }

  componentDidMount() {
    // axios.get(`${server}/container?board_id=${this.props.id}`, { headers: { authorization: this.props.token } })
    //   .then((Res) => {
    //     this.setState({
    //       Containers: Res.data,
    //     });
    //   });
  }

  addContainer= (createObj) => {
    console.log('createObj', createObj);
    const titles = this.state.Containers.concat([createObj]);
    this.setState({
      Containers: titles,
    });
  }

  render() {
    console.log('InBoard', this.state.Containers);
    const { id } = this.props.route.params;
    return (
        <View>
          <ScrollView
          horizontal
          style={styles.Conatiners}>
            { this.state.Containers.length === 0 ? <></>
              : (<View style={styles.Conatiners}>{this.state.Containers.map((container) => <Container navigation={this.props.navigation} contain={container} boardId={id} />)}</View>)}
              <MakeContainer boardId={id} ContainerTitle={this.addContainer} />
          </ScrollView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  Conatiners: {
    flexDirection: 'row',
  },
});
const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(InBoard);
