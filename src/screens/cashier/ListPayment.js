import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { List, InputItem, Modal, Provider, Toast } from '@ant-design/react-native';
import { Button, Slider } from 'react-native-elements';
import { Button as ButtonCustom } from '../../component/button';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Constants from '../../utils/Constants'
const { screenWidth } = Constants;
import moment from 'moment'
import Colors from '../../utils/Colors';
const Item = List.Item;


class ListPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      id: '',
      status: '',
      client: new WebSocket('ws://45.32.23.158:8000/ws/chat/payment/')
    };

    this.onClose = () => {
      this.setState({
        openModal: false,
        listBill: [],
      });

    };

    this.onCloseCart = () => {
      this.setState({
        cart: false,
      });
    };

    this.state.client.onmessage = (message) => {
      console.log('message', message.data);
      const { type } = JSON.parse(message.data)
      if (type && type === 'confirm') {
        Toast.success('Success!', 0.5, () => {
          this.setState({ openModal: false, numMade: 0 })
        });
      }
      else {
        let data = JSON.parse(message.data)
        let listBill = [...data.message];
        this.setState({ listBill: listBill })
      }
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
        <Item style={{ width: screenWidth }} >
          <View style={{ flexDirection: 'row', width: screenWidth }}>
            <View style={{ width: '15%' }}>
              <Text>
                {'Bàn'}
              </Text>
            </View>
            <View style={{ width: '15%', alignItems: 'flex-start', marginLeft: -10 }}>
              <Text>
                {'Số tiền'}
              </Text>
            </View>

            <View style={{ width: '25%', alignItems: 'flex-start', marginLeft: 13 }}>
              <Text>
                {'Thời gian'}
              </Text>
            </View>
            <View style={{ width: '10%', alignItems: 'flex-start', }}>
              <Text>
                {'Status'}
              </Text>
            </View>
            <View style={{ width: '15%', alignItems: 'center', marginLeft: 5 }}>
              <Text>
                {'Chi tiết'}
              </Text>
            </View>
            <View style={{ width: '15%', alignItems: 'flex-end', marginLeft: -10 }}>
              <Text>
                {'Submit'}
              </Text>
            </View>
          </View>

        </Item>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          >

            <List
              renderHeader=''
              style={{ marginTop: 15, }}
            >
              {
                (this.state.listBill?.length > 0) ? this.state.listBill.map((item) => {
                  // console.log('item:', item)
                  return (
                    <Item style={{ width: screenWidth, }}>
                      <View style={{ flexDirection: 'row', width: screenWidth }}>
                        <View style={{ width: '10%' }} >
                          <Text numberOfLines={1} >
                            {item.table.name}
                          </Text>
                        </View>

                        <View style={{ width: '15%', alignItems: 'center', }}>
                          <Text>
                            {item.total_money}
                          </Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center' }}>
                          <Text style={{ fontSize: 12 }}>
                            {moment(item.updated_at).format('DD-MM-YYYY, h:mm:ss a')}
                          </Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'center', }}>
                          <Text>
                            {item.status}
                          </Text>
                        </View>
                        <View style={{ width: '15%', alignItems: 'center', marginLeft: 10 }}>
                          <TouchableOpacity onPress={() => {
                            console.log('item', item)
                            this.props.navigation.navigate('PaymentDetail', { bill_id: item.id, customer: item.customer.full_name })
                          }}
                            style={{}}
                          >
                            <Text style={{ fontSize: 12, textDecorationLine: 'underline', color: Colors.blueMain }}>
                              {'Chi tiết'}
                            </Text>
                          </TouchableOpacity>

                        </View>
                        {item.status === 'OR' ?
                          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Button
                              buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                              icon={
                                <AntIcon name="bells" size={20} color="#35b043" />
                              }
                              onPress={() => {
                                // console.log('item:', item);
                                this.onSubmit()
                                this.setState({
                                  id: item.id,
                                  status: 'OR'

                                })

                              }}
                            />
                          </View>
                          :
                          item.status === 'PR' ?
                            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-end' }}>
                              <Button
                                buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                                icon={
                                  <AntIcon name="bells" size={20} color="#35b043" />
                                }
                                onPress={() => {
                                  // console.log('item:', item);
                                  this.onSubmit()
                                  this.setState({
                                    id: item.id,
                                    status: 'PR'

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
          style={{ width: '65%', height: '15%', minHeight: 120 }}
          title={<Text style={{ textAlign: 'center', fontSize: 18, marginTop: -10, color: Colors.blackMain }}>Xác nhận thanh toán</Text>}
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
          <ButtonCustom type='first' title='Thanh toán' buttonStyle={{ minHeight: 35, marginTop: 10, borderRadius: 10 }}
            onPress={() => {
              let payload = {
                data: {
                  id: this.state.id,
                  status: this.state.status === 'OR' ? 'PR' : this.state.status === 'PR' ? 'PA' : ''
                }
              }
              console.log('payload:', JSON.stringify(payload))
              this.state.client.send(JSON.stringify(payload))
              this.setState({ openModal: false })
            }}
          >
          </ButtonCustom>
        </Modal>
      </Provider>
    );
  }
}

export default ListPayment;
