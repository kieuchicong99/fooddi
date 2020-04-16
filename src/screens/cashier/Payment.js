import React from 'react';
import {ScrollView, View, Text, StyleSheet, Switch} from 'react-native';
import {List, Button} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
const FoodOnTable = [
  {name: 'Bún cá lóc', amount: 5, cost: '20k'},
  {name: 'Canh cá', amount: 1, cost: '20k'},
  {name: 'Bò Tái chanh', amount: 5, cost: '100k'},
  {name: 'Trâu luộc cả con', amount: 1, cost: '150k'},
  {name: 'Cá chiên sù', amount: 1, cost: '200k'},
  {name: 'Cá chiên giòn', amount: 1, cost: '200k'},
  {name: 'Cá chiên sù', amount: 1, cost: '200k'},
  {name: 'Cá chiên sù', amount: 1, cost: '200k'},
  {name: 'Cá chiên sù', amount: 1, cost: '200k'},
  {name: 'Cá chiên sù', amount: 1, cost: '200k'},
];
const test = () => {
  return (
    <View>
      <Text style={{marginTop: 3}}>Chi tiết</Text>
    </View>
  );
};
const listItemOnTable = () => {
  return FoodOnTable.map((item, index) => {
    return (
      <Item
        disabled
        arrow="horizontal"
        onPress={() => {}}
        key={`${index}`}
        extra={test()}>
        <View style={styles.item}>
          <Text style={{width: '50%', minWidth: 100}}>{item.name}</Text>
          <Text style={{width: '5%', minWidth: 100, color: '#4ebded'}}>
            {item.amount}
          </Text>
          <Text style={{width: '30%', color: '#4ebded'}}>{item.cost}</Text>
        </View>
      </Item>
    );
  });
};
const renderStatusPayment = statusPayment => {
  return (
    <Item
      style={{backgroundColor: 'whitesmoke'}}
      extra={
        <Switch
          style={{marginTop: 0}}
          trackColor={{true: '#4ebded', false: null}}
          value={statusPayment}
        />
      }>
      <View style={{...styles.item, backgroundColor: 'whitesmoke'}}>
        <Text style={{width: '40%', fontSize: 20, textTransform: 'uppercase'}}>
          Bàn số 1
        </Text>
        <Text style={{width: '60%', fontSize: 20}}>Trạng thái thanh toán</Text>
      </View>
    </Item>
  );
};
const renderTitle = () => {
  return (
    <Item
      style={{maxHeight: 35, backgroundColor: '#1890ff'}}
      disabled
      extra=""
      onPress={() => {}}>
      <View style={styles.item}>
        <Text
          style={{
            width: '35%',
            minWidth: 100,
            fontSize: 18,
            textTransform: 'uppercase',
            color: '#ffff',
          }}>
          Tên món
        </Text>
        <Text
          style={{
            width: '30%',
            minWidth: 100,
            fontSize: 18,
            textTransform: 'uppercase',
            color: '#ffff',
          }}>
          Số lượng
        </Text>
        <Text
          style={{
            width: '30%',
            fontSize: 18,
            textTransform: 'uppercase',
            color: '#ffff',
          }}>
          Thành tiền
        </Text>
      </View>
    </Item>
  );
};
export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPayment: false,
    };
  }
  changePayment = () => {
    this.setState({statusPayment: true});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {renderStatusPayment(this.state.statusPayment)}
        {renderTitle()}
        <ScrollView
          style={{backgroundColor: '#f5f5f9'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <List renderHeader>{listItemOnTable()}</List>
        </ScrollView>
        <View
          style={{
            ...styles.item,
            alignItems: 'center',
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            minHeight: 48,
            paddingTop: 0,
          }}>
          <Text style={{width: '50%', fontSize: 24, textAlign: 'left'}}>
            Tổng tiền =
          </Text>
          <Text style={{width: '50%', fontSize: 24, textAlign: 'right'}}>
            1.000.000.000vnđ
          </Text>
        </View>
        <Button
          style={{marginBottom: 15, marginTop: 5}}
          type="primary"
          onPress={() => {
            this.changePayment();
          }}>
          Xác nhận đã Thanh toán
        </Button>
      </View>
    );
  }
}
