import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { List, Provider, Toast, Radio } from '@ant-design/react-native';
import { connect } from 'react-redux';
import WithLoading from '../../component/withLoading';
import { actions as billActions } from '../../redux/billRedux';

const { createBill } = billActions;

const RadioItem = Radio.RadioItem;
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

class ChooseTable extends Component {
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
    console.log('create Bill:', { table: this.state.chooseTable, customer: this.state.customer, status: 'Or' })
    this.props.createBill({ table: this.state.chooseTable, customer: this.state.customer.id, status: 'Or' })
      .then(res => {
        console.log('Create bill res => data:', res);
        if (res.response.data.success === true) {
          Toast.success('Success!', 0.5, () => {
            props.navigation.navigate('OrderFood', { customer: this.state.customer, bill: res.response.data.bill })
          });
        }
        if (res.response.data.success === false) {
          Toast.fail(`${res.response.data.message} \nVui lòng đặt bàn khác`, 0.5);
        }

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
            alignItems: 'center', paddingVertical: 10
          }}>
            {this.state.chooseTable !== '' ? (<Button
              buttonStyle={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#4682c2',
                height: 40,
                minWidth: 120
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
const mapStateToProps = (state) => {
  const { billReducer } = state;
  return {
    isFetching: billReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createBill: (payload, meta) => dispatch(createBill(payload, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(ChooseTable)));
