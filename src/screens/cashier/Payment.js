import React from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { List, Button, Toast, Provider } from '@ant-design/react-native';
import axios from 'axios'
import Constants from '../../utils/Constants'
import Colors from '../../utils/Colors';
import { FlatList } from 'react-native-gesture-handler';
const baseUrl = 'http://45.32.23.158:8000/api/bills/'
const { screenWidth } = Constants;
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: screenWidth
  },
});

const renderStatusPayment = (customer, statusPayment) => {
  return (
    <Item
      style={{ backgroundColor: 'whitesmoke' }}
      extra={
        <View style=
          {{
            maxWidth: '30%',
            backgroundColor: statusPayment === 'PR' ? Colors.yellowMain : statusPayment === 'OR' ? Colors.redMain : Colors.white,
            borderRadius: 10,
            height: 25,
            justifyContent: 'center',
            paddingHorizontal: 5
          }}>
          <Text style={{ fontSize: 12, color: statusPayment === 'PA' ? Colors.greenMain : statusPayment === 'PR' ? Colors.blackMain : statusPayment === 'OR' ? Colors.white : Colors.blackMain }}>
            {statusPayment === 'OR' ? 'Chưa thanh toán ' : statusPayment === 'PR' ? 'Chờ thanh toán' : statusPayment === 'PA' ? 'Đã thanh toán' : ''}
          </Text>
        </View>

      }>
      <View style={{ ...styles.item, backgroundColor: 'whitesmoke' }}>
        <View style={{ width: '40%', justifyContent: "center", marginTop: 5 }}>
          <Text numberOfLines={1} style={{ fontSize: 16, textTransform: 'uppercase' }}>
            KH: {customer}
          </Text>
        </View>
        <View style={{ width: '28%', justifyContent: "center", alignItems: 'flex-end', marginTop: 5 }}>
          <Text style={{ fontSize: 16 }}>Trạng thái  </Text>
        </View>

      </View>
    </Item>
  );
};
const renderTitle = () => {
  return (
    <Item
      style={{ maxHeight: 35, backgroundColor: '#1890ff' }}
      disabled
      extra=""
      onPress={() => { }}>
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
      statusPayment: '',
      bill_detail: [
      ],
      total_money: '',
      refreshing: false,
      isFetching: false,
      bill_id: '',
      client: new WebSocket('ws://45.32.23.158:8000/ws/chat/payment/')
    };

    this.state.client.onmessage = (message) => {
      console.log('message:', message.data);
      const { type } = JSON.parse(message.data)
      if (type && type === 'confirm') {
        Toast.success('Success!', 0.5, () => {
          this.setState({ statusPayment: 'PR' })
          console.log('statusPayment:', this.state.statusPayment);
        });
      }
      else {

      }
    };

  }

  getDetailBill = () => {
    this.setState({ isFetching: true })
    console.log('id123:', this.props.route.params)
    const { bill_id } = this.props.route.params;
    this.setState({ bill_id: bill_id })
    this.setState({ customer: this.props.route.params.customer })
    axios.get(baseUrl + bill_id).then((res) => {
      console.log('res:', res.data.bill.status)
      if (res.data?.success === true) {
        this.setState({ isFetching: false })
        this.setState({ bill_detail: res.data.bill.bill_detail })
        this.setState({ total_money: res.data.bill.total })
        this.setState({ statusPayment: res.data.bill.status })

      }
    }, err => {
      console.log('error:', err)
    })
  }

  componentDidMount() {

    this.getDetailBill();
  }

  render() {
    console.log('props:', this.props);
    let { params } = this.props.route;
    let table = { ...params }
    return (
      <Provider>
        {renderStatusPayment(this.state.customer, this.state.statusPayment)}
        {renderTitle()}
        <ActivityIndicator
          size="large"
          color={Colors.blackMain}
          animating={this.state.isFetching}
          style={{
            backgroundColor: 'rgba(0, 166, 81, 0)',
            position: 'absolute',
            zIndex: 1000,
            top: '40%',
            left: '48%',
          }}
        />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <FlatList
          data={this.state.bill_detail}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
            this.getDetailBill()
          }} />}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => <>

            <Item
              disabled
              onPress={() => { }}
              key={`${index}`}
            >
              <View style={styles.item}>
                <View style={{ width: '50%' }}>
                  <Text style={{ minWidth: 100 }}>{item.food__name}</Text>
                </View>
                <View style={{ width: '5%', alignItems: 'center' }}>
                  <Text style={{ minWidth: 100, color: Colors.blackMain }}>
                    {item.amount}
                  </Text>
                </View>

                <View style={{ width: '45%', alignItems: 'center' }}>
                  <Text style={{ color: '#4ebded' }}>{` ${item.amount} x ${item.food__price}.000 đ`}</Text>
                </View>

              </View>
            </Item>


          </>}
        >

        </FlatList>
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
          <Text style={{ width: '50%', fontSize: 24, textAlign: 'left' }}>
            Tổng tiền =
          </Text>
          <Text style={{ width: '50%', fontSize: 24, textAlign: 'right' }}>
            {this.state.total_money} .000 đ
          </Text>
        </View>
        <Button
          style={{ marginBottom: 15, marginTop: 5, display: this.state.statusPayment === 'OR' ? 'flex' : 'none' }}
          type="primary"
          onPress={() => {
            let payload = {
              data: {
                id: this.state.bill_id,
                status: 'PR'
              }
            }
            console.log('payload:', payload)
            this.state.client.send(JSON.stringify(payload))
          }}>
          {this.state.statusPayment === 'OR' ? 'Gửi yêu cầu thanh toán' : ''}
        </Button>

      </Provider>

    );
  }
}
