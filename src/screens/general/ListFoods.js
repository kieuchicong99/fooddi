import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
const food = require('../../assets/food.jpg');;
const FoodsData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const styles = StyleSheet.create({
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    layout: {
        padding: 10,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
    },
    food_img: {
        width: '100%',
        height: 200,

    },
    desp: {
        fontSize: 24
    },
    cost: {
        textAlign: 'center',
        color: '#4ebded',
        fontSize: 24
    }

})
class ListFoods extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    Food = () => {
        return (
            <View style={styles.layout}>
                <ImageBackground
                    source={food}
                    style={styles.food_img}>

                </ImageBackground>
                <View >
                    <Text style={styles.desp}>
                        Bánh mỳ thịt nướng
                    </Text>
                    <Text style={styles.cost}>
                        25.000vnđ
                    </Text>
                </View>

            </View>
        );
    }
    Foods = () => {
        return (
            FoodsData.map(item => {
                return (this.Food())
            })
        )
    }
    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập tên món ăn"
                    maxLength={20}
                />
                <ScrollView>
                    {this.Foods()}
                </ScrollView>
            </View>


        );
    }
}

export default ListFoods;