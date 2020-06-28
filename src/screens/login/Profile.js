import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }


  }

  // getUser = async () => {
  //   let a = await Storage.getItem('user')

  //   return a.full_name;
  // }
  async componentDidMount() {
    await Storage.getItem('user').then(res => {
      console.log('Profile:', res.full_name)
      this.setState({ user: res })
    })
  }

  render() {
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
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('ProfileDetail') }}
              title=''
            >
              <Image source={{
                uri:
                  'https://www.pngarts.com/files/5/User-Avatar-PNG-Image-Transparent-Background.png',
              }}
                style={{ width: 150, height: 150 }}>
              </Image>
            </TouchableOpacity>

          </View>
          <List
            renderHeader={<Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Helvetica Neue' }}>{this.state.user.full_name}</Text>}>
            <Item arrow="horizontal" thumb={<AntDesin name='creditcard' size={20} style={{ paddingRight: 10 }} />}>
              Thẻ Thanh toán
          </Item>
          </List>

          <List renderHeader={''} style={{ marginTop: 10 }}>
            <Item disabled arrow="horizontal" thumb={<AntDesin name='enviromento' size={20} style={{ paddingRight: 10 }} />}>
              Địa chỉ
          </Item>
            <Item disabled arrow="horizontal" thumb={<AntDesin name='user' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
              Bạn bè
          </Item>
          </List>
          <List renderHeader={'Nâng cao'}>
            <Item arrow="horizontal" thumb={<AntDesin name='mail' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
              Góp ý
          </Item>
            <Item
              arrow="horizontal"
              thumb={<AntDesin name='exclamationcircleo' size={20} style={{ paddingRight: 10 }} />}
              onPress={() => { }}
            >
              Về nhà phát triển
          </Item>
            <Item
              arrow="horizontal"
              thumb={<AntDesin name='questioncircleo' size={20} style={{ paddingRight: 10 }} />}
              onPress={() => { }}>
              Chính sách quy định
          </Item>
          </List>

          <Button
            buttonStyle={{
              backgroundColor: '#00A651',
              padding: 10,
              marginTop: 20,
            }}
            onPress={() => {
              Storage.removeItem('user')
              this.props.navigation.navigate('Login')
            }}
            title="Đăng xuất"
            titleStyle={{ fontSize: 20, textAlign: 'center', color: 'white' }}
          >
          </Button>
          <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 20, textDecorationLine: 'underline' }}>
            Phiên bản 1.0
            </Text>

          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 10, marginBottom: 20 }}>
            Starter Restaurent Application
            </Text>
        </ScrollView>
        <View />
      </View>
    );
  }
}
