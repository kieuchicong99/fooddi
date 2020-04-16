import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {List} from '@ant-design/react-native';
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default class ListTables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: '#f5f5f9'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <List renderHeader={'Danh sách bàn ăn'}>
            <Item
              disabled
              arrow="horizontal"
              extra="thanh toán"
              onPress={() => this.props.navigation.navigate('Payment')}>
              <View style={styles.item}>
                <Text style={{width: '30%', minWidth: 100}}>Bàn số 1</Text>
              </View>
            </Item>
          </List>
        </ScrollView>
        <View></View>
      </View>
    );
  }
}
