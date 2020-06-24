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



class Chef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '', openModal: false,
      cart: false,
      epandShopingCart: false,
      choosingFood: [],
      food__name: '',
      numTodo: 0,
      totalFee: 0,
      numMade: 0
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
  }

  static navigatinOptions = {
    title: 'hello'
  }

  componentDidMount() {
    const client = new WebSocket('ws://45.32.23.158:8000/ws/chat/chef/');
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
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
            <Item >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '30%' }}>
                  <Text>
                    {'Tên món ăn'}
                  </Text>
                </View>
                <View style={{ width: '30%', alignItems: 'center' }}>
                  <Text>
                    {'Cần làm'}
                  </Text>
                </View>

                <View style={{ width: '30%', alignItems: 'flex-end' }}>
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
                        <View style={{ width: '30%' }} >
                          <Text >
                            {item.food__name}
                          </Text>
                        </View>

                        <View style={{ width: '30%', alignItems: 'center' }}>
                          <Text>
                            {item.count - item.count_complete}
                          </Text>
                        </View>

                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end' }}>
                          <Button
                            buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                            icon={
                              <AntIcon name="bells" size={20} color="#35b043" />
                            }
                            onPress={() => {
                              this.onSubmit()
                              this.setState({
                                food__name: item.food__name,
                                numTodo: item.count - item.count_complete
                              })

                            }}
                          />
                        </View>
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
          style={{ width: '85%', height: '30%', marginTop: -50, minHeight: 210 }}
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
            <View style={{ flexDirection: 'row', paddingVertical: 15, marginTop: 60 }}>
              <View style={{ width: '50%', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16 }}>
                  {'0'}
                </Text>
              </View>
              <View style={{ width: '50%', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16 }}>
                  {this.state.numTodo}
                </Text>
              </View>
            </View>
            <Slider
              value={this.state.value}
              onValueChange={(value) => this.setState({ numMade: parseInt(value * this.state.numTodo) })}
            />
            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10 }}>Đã làm: {this.state.numMade}</Text>
            <View style={{ marginTop: 30 }}>
              <ButtonCustom type='first' title='Xác nhận' buttonStyle={{ minHeight: 35 }}>
              </ButtonCustom>
            </View>
          </View>
        </Modal>
      </Provider>
    );
  }
}

export default Chef;
