import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Modal,
  Provider,
} from '@ant-design/react-native';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntyIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '@ant-design/react-native/lib/list/ListItem';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements';
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 45,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  layout: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  food_img: {
    width: 100,
    height: 100,
  },
  desp: {
    fontSize: 15,
  },
  cost: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
class ListFoods extends Component {
  constructor(props) {
    super(props);
    this.state = { a: '', visible2: false, cart: false, epandShopingCart: false, choosingFood: [], totalFee: 0 };
    this.onClose2 = () => {
      this.setState({
        visible2: false,
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

  }

  check = (tmp, food) => {
    if (tmp.length === 0) {
      return -10;
    }
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === food.id) {
        console.log('index:', i)
        return i;
      }
    }
    return -10;
  }
  caculatorFee = () => {
    let tmp = this.state.choosingFood;
    let total = 0;
    tmp.forEach((food, index) => {
      total += food.num * food.price;
    })
    this.setState({ totalFee: total });
  }
  Food = (food, foodImageStyle, textStyle) => {
    return (
      <View style={{ ...styles.item, padding: 10 }} key={`${food.id}`}>
        <View style={{ width: '40%' }}
        >
          <TouchableOpacity onPress={
            () => {
              console.log('hello');
              this.setState({ visible2: true });
            }
          }>
            <ImageBackground
              source={{ uri: 'https://cdn3.iconfinder.com/data/icons/bbq-grilling-and-tail-gating/50/48-512.png' }}
              style={foodImageStyle ? foodImageStyle : styles.food_img}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '60%', height: '100%', ...styles.item }}>
          <View style={{ width: '80%' }}>
            <Text style={{ ...styles.desp, ...textStyle }}>{food.name}</Text>
            <View style={{ ...styles.item, maxHeight: 20 }}>
              <EntyIcon name="shopping-bag" size={13} color="#35b043" />
              <Text style={{ fontSize: 13 }}>999+</Text>
              <Text style={{ fontSize: 13 }}> | </Text>
              <EvilIcon name="like" size={22} color="#35b043" />
              <Text style={{ fontSize: 13 }}>20+</Text>
            </View>
            <Text style={{ ...styles.cost, ...textStyle }}>{`${food.price}.000 đ`}</Text>
          </View>
          <View style={{ width: '20%', height: '100%', justifyContent: 'center' }} >
            <Button
              buttonStyle={{ width: 30, height: 30, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
              icon={
                <AntIcon name="pluscircle" size={30} color="#35b043" />
              }
              onPress={() => {
                this.setState({ cart: true });
                let tmp = this.state.choosingFood;
                let a = this.check(tmp, food);
                console.log("a:", a);
                if (a >= 0) {
                  tmp[a].num += 1;
                }
                if (a === -10) {
                  tmp.push({ ...food, num: 1 })
                }
                this.setState({ choosingFood: [...tmp] })
                console.log("choosingFood:", this.state.choosingFood);
                this.caculatorFee();
              }}
            />
          </View>
        </View>
        <Modal
          style={{ width: '100%', height: '100%' }}
          popup
          visible={this.state.visible2}
          animationType="slide-up"
          onClose={this.onCloseCart}
        >
          <TouchableOpacity onPress={this.onClose2}>
            <View style={{ height: '100%', width: '100%' }}>
              <ImageBackground
                source={{ uri: 'https://cdn3.iconfinder.com/data/icons/bbq-grilling-and-tail-gating/50/48-512.png' }}
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View >
    );
  };
  Foods = (foods, foodImageStyle, textStyle) => {
    return foods.map((food) => {
      return this.Food(food, foodImageStyle, textStyle);
    });
  };
  showCart = () => {
    if (this.state.cart) {
      return (
        <View
          style={{
            height: this.state.epandShopingCart === true ? 250 : 50,
            backgroundColor: '#ffffff',
            // borderWidth: 1,
            // borderColor: 'red',
          }}
        >
          <View style={{
            backgroundColor: '#ffffff', height: 50,
            // borderWidth: 1,
            // borderColor: 'green',
          }}>
            <View style={{ ...styles.item, height: '100%' }}>
              <View style={{ flex: 1, width: '20%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center' }}>
                <Button
                  buttonStyle={
                    { backgroundColor: '#ffffff' }
                  }
                  icon={
                    <AntIcon name="shoppingcart" size={30} color="red" />
                  }
                  onPress={() => { this.setState({ epandShopingCart: !this.state.epandShopingCart }) }}
                />
              </View>
              <View style={{ width: '46%', height: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: '#eb150e', padding: 4 }}>
                  {`${this.state.totalFee}000 đ`}
                </Text>
              </View>
              <View style={{ width: '33%', height: '100%', justifyContent: 'center' }}>
                <Button buttonStyle={{ borderRadius: 25, backgroundColor: 'red', padding: 7 }} title="Chọn món" />
              </View>
            </View>
          </View>
          {
            this.state.epandShopingCart === true ?
              (
                <View style={{
                  height: 200, backgroundColor: '#ffffff', marginTop: 5,
                  // borderWidth: 1,
                  // borderColor: 'blue',
                }}>
                  <ScrollView style={{ flex: 1 }}>
                    {
                      this.state.choosingFood.map((food, index) => {
                        return (
                          <Item>
                            <View style={{ ...styles.item, flexDirection: 'row', padding: 4, paddingLeft: 10 }}>
                              <View style={{ width: '30%' }}>
                                <Text style={{ fontSize: 16 }}>
                                  {food.name}
                                </Text>
                              </View>
                              <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 16 }}>
                                  {`${food.price}.000đ`}
                                </Text>
                              </View>
                              <View style={{ width: '25%', alignItems: 'center' }}>
                                <Text style={{ color: '#35b043', fontSize: 18, fontWeight: 'bold' }}>
                                  {food.num}
                                </Text>
                              </View>
                              <View style={{ width: '10%', alignItems: 'flex-end' }}>
                                <Button
                                  buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                                  icon={
                                    <AntIcon name="pluscircle" size={20} color="#35b043" />
                                  }
                                  onPress={() => {
                                    let tmp = this.state.choosingFood;
                                    tmp[index].num += 1;
                                    this.setState({ choosingFood: [...tmp] });
                                    this.caculatorFee();
                                  }}
                                />
                              </View>

                              <View style={{ width: '10%', alignItems: 'center' }}>
                                <Button
                                  buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                                  icon={
                                    <AntIcon name="minuscircleo" size={20} color="#35b043" />
                                  }
                                  onPress={() => {
                                    let tmp = this.state.choosingFood;
                                    if (food.num >= 1) {
                                      tmp[index].num -= 1;
                                    }
                                    if (food.num === 0) {
                                      tmp.splice(index, 1)
                                    }
                                    this.setState({ choosingFood: [...tmp] });
                                    this.caculatorFee();
                                  }}
                                />
                              </View>

                              <View style={{ width: '10%', alignItems: 'center' }}>
                                <Button
                                  buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
                                  icon={
                                    <AntIcon name="close" size={20} color="#eb150e" />
                                  }
                                  onPress={() => {
                                    let tmp = this.state.choosingFood;
                                    let a = this.check(tmp, food)
                                    if (a >= 0) {
                                      tmp.splice(a, 1)
                                      this.setState({ choosingFood: [...tmp] });
                                      this.caculatorFee();
                                    }
                                  }}
                                />
                              </View>
                            </View>
                          </Item>
                        )
                      })
                    }
                  </ScrollView>
                </View>
              )
              : null
          }
        </View >
      );
    }
  }
  render() {
    return (
      <Provider style={{
        height: '100%',
        // borderWidth: 1,
        // borderColor: 'yellow',
      }}>
        <View
          style={
            {
              flex: 1,
              minHeight: 10,
            }} >
          <View style={
            {
              ...styles.item,
              borderColor: '#CCCCCC',
              backgroundColor: '#ffffff',
              borderRadius: 25,
              paddingRight: 10,
              Height: 40,
              maxHeight: 40,
            }}>
            <View style={{ height: '100%', justifyContent: 'center', padding: 0, paddingLeft: 10 }}>
              <EvilIcon name="search" size={30} color="#35b043" />
            </View>

            <View style={{ height: '100%', justifyContent: 'center', paddingLeft: 10 }}>
              <TextInput
                style={{ minHeight: 40, height: 40, fontSize: 16 }}
                placeholder="Tìm món ăn"
                maxLength={40}
              />
            </View>
          </View>


        </View>

        <View style={{
          flex: 9,
          // borderWidth: 1,
          // borderColor: 'black',
        }}  >
          <View style={{ flex: 8 }}>
            <ScrollView>
              {this.Foods(this.props.foods, this.props.foodImageStyle, this.props.textStyle)}
            </ScrollView>
          </View>

        </View>
        {this.showCart()}
      </Provider>
    );
  }
}

export default ListFoods;
