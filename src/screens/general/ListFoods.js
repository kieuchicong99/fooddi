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
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';
// let food = require('../../assets/food.jpg');
let a = ' ';
const FoodsData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
    backgroundColor: 'white',
  },
  layout: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: 'whitesmoke',
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
    this.state = { a: '', visible2: false, cart: false };
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
  componentDidMount() {
    axios.get(baseUrl + '/food-group')
      .then(res => {
        const List = res.data;
        // this.setState({ nameList });
        a = res.data.data[1].foods[1].img;
        // food = require(a);
        this.setState({ a: a });
        console.log('data:', res.data.data[1].foods[1].img);
      });
  }
  Food = (index, foodImageStyle, textStyle) => {
    return (
      <View style={{ ...styles.item, padding: 10 }} key={`${index}`}>
        <View style={{ width: '40%' }}
        >
          <TouchableOpacity onPress={
            () => {
              console.log('hello');
              this.setState({ visible2: true });
            }
          }>
            <ImageBackground
              source={{ uri: a }}
              style={foodImageStyle ? foodImageStyle : styles.food_img}

            />
          </TouchableOpacity>

        </View>

        <View style={{ width: '60%', height: '100%', ...styles.item }}>
          <View style={{ width: '80%' }}>
            <Text style={{ ...styles.desp, ...textStyle }}>Bánh mỳ thịt nướng</Text>
            <View style={{ ...styles.item, maxHeight: 20 }}>
              <EntyIcon name="shopping-bag" size={13} color="#35b043" />
              <Text style={{ fontSize: 13 }}>999+</Text>
              <Text style={{ fontSize: 13 }}> | </Text>
              <EvilIcon name="like" size={22} color="#35b043" />
              <Text style={{ fontSize: 13 }}>20+</Text>
            </View>
            <Text style={{ ...styles.cost, ...textStyle }}>25.000vnđ</Text>
          </View>
          <View style={{ width: '20%', height: '100%', justifyContent: 'center' }} >
            <Button
              buttonStyle={{ width: 30, height: 30, backgroundColor: 'white', borderRadius: 15, padding: 0 }}
              icon={
                <AntIcon name="pluscircle" size={30} color="#35b043" />
              }
              onPress={() => { this.setState({ cart: true }); }}
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
                source={{ uri: a }}
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              />
            </View>
          </TouchableOpacity>

        </Modal>



      </View >
    );
  };
  Foods = (foodImageStyle, textStyle) => {
    return FoodsData.map((item, index) => {
      return this.Food(index, foodImageStyle, textStyle);
    });
  };
  showCart = () => {
    if (this.state.cart) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

          <View style={{ ...styles.item }}>
            <View style={{ width: '20%', float: 'left', height: '100%', backgroundColor: 'white', justifyContent: 'center' }}>

              <Button
                buttonStyle={
                  { backgroundColor: 'white' }
                }
                icon={
                  <AntIcon name="shoppingcart" size={30} color="red" />
                }
              />
            </View>
            <View style={{ width: '46%', height: '100%', justifyContent: 'center' }}>
              <Text>
                {'100k'}
              </Text>
            </View>
            <View style={{ width: '33%', height: '100%', justifyContent: 'center' }}>
              <Button buttonStyle={{ borderRadius: 25, backgroundColor: 'red', padding: 7 }} title="Giao hàng" />
            </View>
          </View>
        </View>
      );
    }
  }
  render() {
    return (
      <Provider style={{ height: '100%' }}>
        {/* <View style={{ height: '100%' }}> */}
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

        <View style={{ flex: 9 }}  >
          <View style={{ flex: 8 }}>
            <ScrollView>
              {this.Foods(this.props.foodImageStyle, this.props.textStyle)}
            </ScrollView>
          </View>

        </View>
        {this.showCart()}

        {/* </View> */}
      </Provider>
    );
  }
}

export default ListFoods;
