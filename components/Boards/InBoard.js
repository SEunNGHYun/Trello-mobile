import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { server } from '../utils/server';
import HeaderLeft from '../Headers/CustomHeader_Left';
import HeaderRight from '../Headers/CustomHeader_Right';
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
    axios.get(`${server}/containers/${this.props.route.params.id}`, { headers: { authorization: this.props.token } })
      .then((Res) => {
        if (Res.status >= 200) {
          this.setState({
            Containers: Res.data.result,
          });
        }
      })
      .catch(() => {
        console.log('보드에서 에렁');
      });
  }

  addContainer= (createObj) => {
    const titles = this.state.Containers.concat([createObj]);
    this.setState({
      Containers: titles,
    });
  }

  render() {
    const { id, name } = this.props.route.params;
    return (
        <View>
          <Header
          containerStyle={{
            height: 55, width: '100%', justifyContent: 'center',
          }}
          leftComponent={<HeaderLeft title={name} navigation={this.props.navigation} InBoard />}
          rightComponent={<HeaderRight InBoard navigation={this.props.navigation} />} />
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.Conatiners}>
            { this.state.Containers.length > 0
              && (<View style={styles.Conatiners}>{this.state.Containers.map((container) => <Container navigation={this.props.navigation} contain={container} boardId={id} />)}</View>)}
              <MakeContainer boardId={id} addContainer={this.addContainer} />
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
