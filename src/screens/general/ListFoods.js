import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
const food = require('../../assets/food.jpg');
const FoodsData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const styles = StyleSheet.create({
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  layout: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  food_img: {
    width: '100%',
    height: 200,
  },
  desp: {
    fontSize: 24,
  },
  cost: {
    textAlign: 'center',
    color: '#4ebded',
    fontSize: 24,
  },
});
class ListFoods extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Food = (index, foodImageStyle, textStyle) => {
    return (
      <View style={styles.layout} key={`${index}`}>
        <ImageBackground
          source={food}
          style={foodImageStyle ? foodImageStyle : styles.food_img}
        />
        <View>
          <Text style={{...styles.desp, ...textStyle}}>Bánh mỳ thịt nướng</Text>
          <Text style={{...styles.cost, ...textStyle}}>25.000vnđ</Text>
        </View>
      </View>
    );
  };
  Foods = (foodImageStyle, textStyle) => {
    return FoodsData.map((item, index) => {
      return this.Food(index, foodImageStyle, textStyle);
    });
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tên món ăn"
          maxLength={20}
        />
        <ScrollView>
          {this.Foods(this.props.foodImageStyle, this.props.textStyle)}
        </ScrollView>
      </View>
    );
  }
}

export default ListFoods;
