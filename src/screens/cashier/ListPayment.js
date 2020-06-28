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
        listFood: [],
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
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          >
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

                <View style={{ width: '25%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Thời gian'}
                  </Text>
                </View>
                <View style={{ width: '10%', alignItems: 'flex-start' }}>
                  <Text>
                    {'Status'}
                  </Text>
                </View>
                <View style={{ width: '15%', alignItems: 'center', marginLeft: 10 }}>
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
                        <View style={{ width: '15%', alignItems: 'center', }}>
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
            <View style={{ flexDirection: 'row', paddingVertical: 15, marginTop: 10 }}>
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

            <View style={{ marginTop: 0 }}>
              <ButtonCustom type='first' title='Xác nhận' buttonStyle={{ minHeight: 35 }}
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
            </View>
          </View>
        </Modal>
      </Provider>
    );
  }
}

export default ListPayment;
