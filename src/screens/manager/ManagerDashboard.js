import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { List, Drawer } from '@ant-design/react-native';
import AntDesin from 'react-native-vector-icons/AntDesign'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import Storage from '../../utils/storage'
import Colors from '../../utils/Colors';
import Constants from '../../utils/Constants'
const { screenWidth, screenHeight } = Constants;
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default class ManagerDashboard extends Component {
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
  sidebar = () => {
    return (
      <View style={{ width: screenWidth, maxHeight: 150, }}>

        <ImageBackground
          style={{ width: screenWidth, height: 150, }}
          source={{ uri: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200120161356-cnn-worlds-best-new-restaurants---madera---simon-brown-photography-1-1.jpg' }}>

          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[Colors.blackMain, 'rgba(0, 166, 81, 0)']}
            style={{
              opacity: 0.95,
              position: 'absolute',
              top: 0,
              height: 150,
              width: screenWidth,
              zIndex: 10,
            }}>
            <View style={{ paddingTop: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 10, marginBottom: 0, color: Colors.white }}>
                Starter Restaurent Application
            </Text>
              <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 0, marginBottom: 6, color: Colors.white }}>
                Stater to Faster
            </Text>
              <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 0, textDecorationLine: 'underline', color: Colors.white }}>
                Phiên bản 1.0
            </Text>
            </View>

          </LinearGradient>
        </ImageBackground>
      </View>

    )
  }

  render() {
    return (
      <View style={{ height: screenHeight }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Drawer
          style={{ flex: 1 }}
          sidebar={this.sidebar()}
          position={"right"}
          open={false}
          drawerRef={el => (this.drawer = el)}
          onOpenChange={(value) => {
            if (value) {
              StatusBar.setBarStyle('light-content');

            }
            if (value === false) {
              StatusBar.setBarStyle('dark-content');
            }
          }}
          drawerBackgroundColor={Colors.white}
          drawerWidth={screenWidth}
        >
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.white }}
              onPress={() => {
                this.drawer && this.drawer.openDrawer()
              }}
              title=''
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{
                  uri:
                    'https://raw.githubusercontent.com/kieuchicong99/imageSource/master/logo-app.png',
                }}
                  style={{ width: screenHeight / 5 - 20, height: screenHeight / 5 - 20 }}>
                </Image>
              </View>
            </TouchableOpacity>
          </View>

        </Drawer>
        <View style={{ flex: 4 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          >
            <List renderHeader={'Người dùng'}>
              <Item disabled arrow="horizontal" thumb={<AntDesin name='team' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Quản lý người dùng
              </Item>
            </List>

            <List renderHeader={'Thống kê báo cáo'}>
              <Item disabled arrow="horizontal" thumb={<AntDesin name='barchart' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Biểu đồ doanh thu
              </Item>

              <Item disabled arrow="horizontal" thumb={<AntDesin name='dotchart' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Biểu đồ số lượng khách
              </Item>
            </List>

            <List renderHeader={'Quản lý đơn'}>
              <Item disabled arrow="horizontal" thumb={<AntDesin name='carryout' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Danh sách các hóa đơn
              </Item>
            </List>

            <List renderHeader={'Quản lý bàn'}>
              <Item disabled arrow="horizontal" thumb={<AntDesin name='tag' size={20} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Trạng thái các bàn ăn
              </Item>
            </List>

            <List renderHeader={'Quản lý món ăn'}>
              <Item disabled arrow="horizontal" thumb={<MaterialCommunity name='food' size={30} style={{ paddingRight: 10 }} />} onPress={() => { }}>
                Quản lý các món ăn
              </Item>
            </List>

            <View style={{ minHeight: 120, }}>
            </View>


          </ScrollView>
        </View>
        <View />
      </View >
    );
  }
}
