import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { List, InputItem, Modal, Provider } from '@ant-design/react-native';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
const Item = List.Item;
const styles = StyleSheet.create({

});



class Chef extends Component {
  constructor(props) {
    super(props);
    this.state = { a: '', visible2: false, cart: false, epandShopingCart: false, choosingFood: [], totalFee: 0 };
    this.onClose2 = () => {
      this.setState({
        visible2: false,
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
    Modal.prompt(
      'Name',
      'name message',
      number => {
        console.log(`realNumber: ${number}`);
        this.setState({ realNumber: number })
      },
      'default',
      null,
      ['please input name'],

    );
  };


  render() {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Item >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '30%' }}>
                  <Text>
                    {'Tên món ăn'}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text>
                    {'Cần làm'}
                  </Text>
                </View>

                {/* <View style={{ width: '30%' }}>
                  <Text>
                    {'Đã làm'}
                  </Text>
                </View> */}
                <View style={{ width: '10%' }}>
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
                    <Item
                    // arrow="horizontal"
                    // extra='chi tiết'
                    >
                      <View style={{ flex: 1, flexDirection: 'row', height: '100%' }}>
                        <View style={{ width: '30%' }} >
                          <Text >
                            {item.food__name}
                          </Text>
                        </View>

                        <View style={{ width: '20%' }}>
                          <Text>
                            {item.count - item.count_complete}
                          </Text>
                        </View>

                        {/* <View style={{ width: '30%' }}>
                          <Text>
                            {this.state.realNumber}
                          </Text>
                        </View> */}

                        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                          <Button
                            buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                            icon={
                              <AntIcon name="bells" size={20} color="#35b043" />
                            }
                            onPress={() => {
                              this.onSubmit()

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


      </Provider>
    );
  }
}

export default Chef;
