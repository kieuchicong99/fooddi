import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { List, Provider, Toast, Radio } from '@ant-design/react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const RadioItem = Radio.RadioItem;
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default class ChooseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListTables: [
      ],
      customer: {},
      chooseTable: ''
    };
  }

  componentDidMount() {
    console.log('prams:', this.props.route.params)
    this.setState({ ListTables: this.props.route.params.listTables })
    this.setState({ customer: this.props.route.params.customer })
    const { customer } = this.props.route.params;
    this.props.navigation.setOptions({ title: `KH : ${customer.full_name}` });
  }

  addTable(table) {
    this.setState({ chooseTable: table.id });
    console.log("chooseTable:", this.state.chooseTable)
  }

  createBill = (props) => {
    console.log('create Bill:', [{ table: this.state.chooseTable, customer: this.state.customer, status: 'Or' }])
    axios.post(baseUrl + '/bills', [{ table: this.state.chooseTable, customer: this.state.customer.id, status: 'Or' }])
      .then(res => {
        let customer = res.data;
        console.log('Create bill res => data:', res);
        Toast.success('Success!', 0.5, () => {
          props.navigation.navigate('OrderFood', { customer: this.state.customer, bill: res.data.bill })
        });
      }, err => {
        Toast.fail('Có lỗi xảy ra:' + err, 0.5);
      });
  }

  renderTable = (table, index) => {
    return (
      <RadioItem key={`${index}`} style={{ ...styles.item, alignItems: 'center', backgroundColor: this.state.chooseTable === table.id ? '#aaafb5' : '#ffffff', fontSize: 18, marginLeft: 15 }}
        checked={this.state.chooseTable === table.id}
        onChange={event => {
          if (event.target.checked) {
            this.setState({ chooseTable: table.id });
          }
        }}
      >
        {table.name}
      </RadioItem>
    );
  }
  render() {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <Text style={
            {
              fontSize: 20,
              margin: 5,
              textAlign: 'center'
            }
          }>
            Chọn bàn ăn
                </Text>
          <ScrollView
            style={{ backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <List >
              {
                this.state.ListTables.map((table, i) => this.renderTable(table, i))
              }
            </List>
          </ScrollView>
          <View style={{
            alignItems: 'center'
          }}>
            {this.state.chooseTable !== '' ? (<Button
              buttonStyle={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#4682c2',
              }}
              onPress={() =>
                this.createBill(this.props)
              }
              titleStyle={{
                color: "#ffffff",
                textAlign: 'center'
              }}
              title="Hoàn Thành"
            />) : null}
          </View>
          <View />
        </View>
      </Provider>
    );
  }
}
