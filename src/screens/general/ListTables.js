import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { List } from '@ant-design/react-native';
import Colors from '../../utils/Colors'
import {
  Provider,
} from '@ant-design/react-native'
import Constants from '../../utils/Constants'
const { screenWidth } = Constants;
import axios from 'axios'
const baseUrl = 'http://45.32.23.158:8000/api/tables'

const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default class listTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      refreshing: false,
      listTables: [

      ],
    };
  }

  async componentDidMount() {
    this.setState({ isFetching: true })
    await this.getStatusTables();

  }

  getStatusTables = async () => {
    this.setState({ isFetching: true })
    await axios.get(baseUrl).then(res => {
      console.log('res:', res)
      if (res?.data?.success) {
        this.setState({ listTables: res.data.data })
        this.setState({ isFetching: false })

      }
    })
  }
  extraComponent = (props, table) => {
    return (
      <View style={{ width: 110, alignItems: 'center', paddingVertical: 5, borderRadius: 20, backgroundColor: table.status === false ? Colors.greenMain : table.status === true ? Colors.blueMain : '' }}>
        <Text style={{ color: Colors.white, textAlign: 'right' }}>
          {table.status === true ? 'Còn trống' : 'Đang sử dụng'}
        </Text>
      </View>

    );
  };

  render() {
    return (
      <Provider>
        <ActivityIndicator
          size="large"
          color={Colors.blackMain}
          animating={this.state.isFetching}
          style={{
            backgroundColor: 'rgba(0, 166, 81, 0)',
            position: 'absolute',
            zIndex: 1000,
            top: '40%',
            left: '48%',
          }}
        />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ height: 60, justifyContent: 'center', paddingHorizontal: 20, paddingTop: 15 }}>
          <Text style={{ fontSize: 20 }}>
            Trạng thái các bàn ăn
        </Text>
        </View>

        <FlatList
          data={this.state.listTables}
          renderItem={({ item, index }) => <>
            <Item disabled key={`${index}`} style={{ opacity: 0.85, backgroundColor: Colors.white }}>
              <View style={{ ...styles.item, alignItems: 'center' }}>
                <Text
                  style={{
                    width: 0.3 * screenWidth,
                    minWidth: 100,
                    fontSize: 16,
                    color: Colors.blackMain
                  }}
                >
                  {item.name}
                </Text>
                <View style={{ width: 0.6 * screenWidth, minWidth: 100, alignItems: 'flex-end' }}>
                  {this.extraComponent(this.props, item)}
                </View>
              </View>
            </Item>

          </>
          }
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
            this.getStatusTables()
          }} />}
        />

      </Provider >
    );
  }
}
