import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntyIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
const food = require('../../assets/food.jpg');
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
    this.state = {};
  }
  Food = (index, foodImageStyle, textStyle) => {
    return (
      <View style={{ ...styles.item, padding: 10 }} key={`${index}`}>
        <View style={{ width: '40%' }}>
          <ImageBackground
            source={food}
            style={foodImageStyle ? foodImageStyle : styles.food_img}
          />
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
              } />
          </View>

        </View>
      </View >
    );
  };
  Foods = (foodImageStyle, textStyle) => {
    return FoodsData.map((item, index) => {
      return this.Food(index, foodImageStyle, textStyle);
    });
  };
  render() {
    return (
      <View style={{ height: '100%' }}>
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
          <ScrollView>
            {this.Foods(this.props.foodImageStyle, this.props.textStyle)}
          </ScrollView>
        </View>

      </View>
    );
  }
}

export default ListFoods;
