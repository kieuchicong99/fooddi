import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { List } from '@ant-design/react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    this.state = {
      ListTables: [
        { id: 1, name: 'Bàn số 1' },
        { id: 2, name: 'Bàn số 2' },
        { id: 3, name: 'Bàn số 3' },
        { id: 4, name: 'Bàn số 4' },
        { id: 5, name: 'Bàn số 5' },
        { id: 6, name: 'Bàn số 6' },
        { id: 7, name: 'Bàn số 7' },
        { id: 8, name: 'Bàn số 8' },
        { id: 9, name: 'Bàn số 9' },
        { id: 10, name: 'Bàn số 10' },

      ],
    };
  }
  extraComponent = (props, table) => {
    return (
      <View style={{ ...styles.item, width: '100%' }}>
        <View style={{ width: '40%', alignItems: 'flex-end' }}>
          <Button
            buttonStyle={{
              borderRadius: 30,
              padding: 10,
              paddingTop: 3,
              paddingBottom: 3,
              backgroundColor: '#ffffff'
            }}
            onPress={() => props.navigation.navigate('OrderFood')}
            title=""
            icon={<SimpleLineIcons name="note" size={20} color="#0099ff" style={{ marginRight: 5 }} />}
          />
        </View>
        <View style={{ width: '10%' }} />
        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <Button
            buttonStyle={{
              borderRadius: 40,
              padding: 15,
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: '',
            }}
            onPress={() => props.navigation.navigate('Payment', table)}
            title=""
            icon={<MaterialIcons name="payment" size={25} color="#35b043" style={{ marginRight: 5 }} />}
          />
        </View>
      </View>
    );
  };
  renderTable = (table, index) => {
    return (
      <Item disabled key={`${index}`}>
        <View style={{ ...styles.item, alignItems: 'center' }}>
          <Text
            style={{
              width: '30%',
              minWidth: 100,
              fontSize: 18,
            }}
          >
            {table.name}
          </Text>
          <View style={{ width: '70%', minWidth: 100 }}>
            {this.extraComponent(this.props, table)}
          </View>
        </View>
      </Item>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: '#f5f5f9' }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <List renderHeader={'Danh sách bàn ăn'}>
            {
              this.state.ListTables.map((table, i) => this.renderTable(table, i))
            }

          </List>
        </ScrollView>
        <View />
      </View>
    );
  }
}
