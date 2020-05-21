import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import ListFoods from '../general/ListFoods';
import axios from 'axios';
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';

class OrderFood extends React.Component {
  constructor() {
    super();
    this.state = {
      foodGroup: [],
      groupName: []
    }
  }

  componentDidMount() {
    axios.get(baseUrl + '/food-group')
      .then(res => {
        const List = res.data;
        console.log('food group:', res);
        this.setState({
          foodGroup: res.data.data
        })
        let tmp = []
        res.data.data.forEach(element => {
          tmp.push({ title: element.name })
        });
        console.log(tmp)
        this.setState({ groupName: [...tmp] })
      });
    const { customer } = this.props.route.params;
    this.props.navigation.setOptions({ title: `KH :  ${customer.full_name}` });
  }

  render() {
    const { foodGroup } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Tabs tabs={this.state.groupName}>
          {
            foodGroup.map(element => {
              return (
                <View style={{ flex: 1 }}>
                  <ListFoods foods={element.foods} />
                </View>
              )
            })
          }
        </Tabs>
      </View >
    );
  }
}

export default OrderFood;
