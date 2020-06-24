import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { List, InputItem, Modal, Provider } from '@ant-design/react-native';
import { Button, Slider } from 'react-native-elements';
import { Button as ButtonCustom } from '../../component/button';
import AntIcon from 'react-native-vector-icons/AntDesign';
const Item = List.Item;
const styles = StyleSheet.create({

});



class ListPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      table: '',
      food: '',
      amount: '',
      id: '',
      client: new WebSocket('ws://45.32.23.158:8000/ws/chat/payment/')
    };

    this.onClose = () => {
      this.setState({
        openModal: false,
        listFood: [],

      });

    };

    this.onCloseCart = () => {
      this.setState({
        cart: false,
      });
    };

    this.state.client.onmessage = (message) => {
      console.log('onmessage');
      let data = JSON.parse(message.data)
      let listFood = [...data.message];
      listFood.map(item => {
        console.log('item:', item)
        return { key: '0', item, }
      })

      console.log('listFood:', listFood)
      this.setState({ listFood: listFood })
      console.log('this.state  =>:', this.state.listFood);

    };

  }

  static navigatinOptions = {
    title: 'hello'
  }

  componentDidMount() {

  }

  onSubmit = () => {
    this.setState({ openModal: true })
  };


  render() {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          >
            <Item style={{ width: '100%' }} >
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '10%' }}>
                  <Text>
                    {'Bàn'}
                  </Text>
                </View>
                <View style={{ width: '15%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Số tiền'}
                  </Text>
                </View>

                <View style={{ width: '15%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Thời gian'}
                  </Text>
                </View>
                <View style={{ width: '18%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Trạng thái'}
                  </Text>
                </View>
                <View style={{ width: '15%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Chi tiết'}
                  </Text>
                </View>
                <View style={{ width: '15%', alignItems: 'flex-end' }}>
                  <Text>
                    {'Submit'}
                  </Text>
                </View>
              </View>

            </Item>
            <List
              renderHeader=''
              style={{ marginTop: 15, }}
            >
              {
                (this.state.listFood?.length > 0) ? this.state.listFood.map((item) => {
                  console.log('item:', item)
                  return (
                    <Item>
                      <View style={{ flex: 1, flexDirection: 'row', height: '100%' }}>
                        <View style={{ width: '15%' }} >
                          <Text >
                            {item.table.name}
                          </Text>
                        </View>

                        <View style={{ width: '15%', alignItems: 'center' }}>
                          <Text>
                            {item.total_money}
                          </Text>
                        </View>
                        <View style={{ width: '15%', alignItems: 'center' }}>
                          <Text>
                            {item.updated_at}
                          </Text>
                        </View>
                        <View style={{ width: '15%', alignItems: 'center' }}>
                          <Text>
                            {item.status === false ? 'Chưa' : 'Rồi'}
                          </Text>
                        </View>
                        <View style={{ width: '15%', alignItems: 'center' }}>
                          <Text>
                            {'chi tiết'}
                          </Text>
                        </View>
                        {item.status === false ?
                          <View style={{ width: '15%', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Button
                              buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                              icon={
                                <AntIcon name="bells" size={20} color="#35b043" />
                              }
                              onPress={() => {
                                console.log('item:', item);
                                this.onSubmit()
                                this.setState({
                                  table: item.table,
                                  food: item.food,
                                  amount: item.amount,
                                  id: item.id,

                                })

                              }}
                            />
                          </View>
                          :
                          <></>
                        }


                      </View>
                    </Item>
                  )
                }) : ''
              }
            </List>
          </ScrollView>
          <View />
        </View >
        <Modal
          style={{ width: '65%', height: '15%', marginTop: -50, minHeight: 150 }}
          title={<Text style={{ textAlign: 'center', fontSize: 18 }}>{this.state.titleModal}</Text>}
          transparent
          onClose={
            () => {
              console.log('onClose');
              this.setState({ openModal: false, numMade: 0 })
            }
          }
          visible={this.state.openModal}
          closable

        >
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', marginVertical: 15 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 15, marginTop: 15 }}>
              <View style={{ width: '30%', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16 }}>
                  {this.state.table}
                </Text>
              </View>
              <View style={{ width: '30%', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16 }}>
                  {this.state.food}
                </Text>
              </View>
              <View style={{ width: '30%', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16 }}>
                  {this.state.amount}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <ButtonCustom type='first' title='Xác nhận' buttonStyle={{ minHeight: 35 }}
                onPress={() => {
                  let payload = {
                    data: {
                      id: this.state.id,
                      delivery_by: 'CONG'
                    }
                  }

                  this.state.client.send(JSON.stringify(payload))
                  this.setState({ openModal: false })
                }}
              >
              </ButtonCustom>
            </View>
          </View>
        </Modal>
      </Provider>
    );
  }
}

export default ListPayment;
