import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { List } from '@ant-design/react-native';
import AntDesin from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-elements';
import Storage from '../../utils/storage'
const Item = List.Item;
const Brief = Item.Brief;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }


  }

  async componentDidMount() {
    await Storage.getItem('user').then(res => {
      console.log('Profile:', res.full_name)
      this.setState({ user: res })
    })
  }

  render() {
    const { user } = this.state;
    return (
      <View style={{ flex: 1 }}>

        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          <List
            renderHeader=''
            style={{ marginTop: 15, }}
          >
            <Item
              style={{ padding: 10 }}
              arrow="horizontal"
              extra={<Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 14 }}>Đổi ảnh đại diện</Text>}
              thumb=
              {
                <ImageBackground
                  source={{
                    uri:
                      'https://www.pngarts.com/files/5/User-Avatar-PNG-Image-Transparent-Background.png',
                  }}
                  style={{ width: 40, height: 40 }}>
                </ImageBackground>
              }
            >
            </Item>

            <Item
              arrow="horizontal"
              extra={user.username}
            >
              Tên tài khoản
          </Item>
            <Item
              arrow="horizontal"
              extra={user.office_name}
            >
              Chức vụ
          </Item>
          </List>

          <List renderHeader={''} style={{ marginTop: 10 }}>
            <Item
              disabled
              arrow="horizontal"
              onPress={() => { }}
              extra={user.full_name}
            >
              Tên của bạn
          </Item>
            <Item
              disabled
              arrow="horizontal"
              extra='0795038669'
            >
              Số điện thoại
          </Item>

          </List>
          <List renderHeader={''}>
            <Item
              arrow="horizontal"
              extra={<Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 14 }}>Nhập ngay</Text>}
            >
              Email
          </Item>
            <Item
              arrow="horizontal"
              onPress={() => { }}
              extra='Nam'
            >
              Giới tính
          </Item>

          </List>

          <Button
            buttonStyle={{
              backgroundColor: '#00A651',
              padding: 10,
              marginTop: 50,
            }}
            onPress={() => {
            }}
            title="Cập nhật thông tin cá nhân"
            titleStyle={{ fontSize: 20, textAlign: 'center', color: 'white' }}
          >
          </Button>
        </ScrollView>
        <View />
      </View>
    );
  }
}
