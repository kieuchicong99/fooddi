import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  PushNotificationIOS,
  StatusBar,
} from 'react-native';
const background = require('../../assets/login.jpg');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import userApi from '../../repository/user_repository'
import { Button } from 'react-native-elements';
import { Toast, Provider } from '@ant-design/react-native';
import Storage from '../../utils/storage'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  CheckTextInput = () => {
    if (this.state.username != '') {
      if (this.state.password != '') {
        return true;
      } else {
        alert('Hãy nhập mật khẩu'); AfterLogin
        return false;
      }
    } else {
      alert('Hãy nhập tên đăng nhập');
      return false
    }
  };

  render() {
    const { navigation } = this.props;
    return (

      <Provider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View>
            <ImageBackground
              source={background}
              style={{ width: '100%', height: '100%' }}>
              <View
                style={{
                  padding: 40,
                  top: '30%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: '#D2D2D2',
                    backgroundColor: '#F6F6F8',
                    borderWidth: 1,
                    borderRadius: 4,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome name="user" size={25} />
                  </View>
                  <View style={{ width: '80%' }}>
                    <TextInput
                      placeholder="username"
                      placeholderTextColor="#363636"
                      style={{
                        backgroundColor: '#F6F6F8',
                        fontFamily: 'Helvetica Neue',
                        textAlign: 'left',
                        fontSize: 20,
                        paddingLeft: 15,
                        height: 48,
                        color: '#363636',
                      }}
                      value={this.state.username}
                      onChangeText={value => {
                        this.setState({
                          username: value,
                        });
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: '#D2D2D2',
                    backgroundColor: '#F6F6F8',
                    borderWidth: 1,
                    borderRadius: 4,
                    marginTop: 10
                  }}>
                  <View
                    style={{
                      width: '20%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome name="qrcode" size={25} />
                  </View>
                  <View style={{ width: '80%' }}>
                    <TextInput
                      placeholder="password"
                      placeholderTextColor="#363636"
                      secureTextEntry={true}
                      style={{
                        backgroundColor: '#F6F6F8',
                        fontFamily: 'Helvetica Neue',
                        textAlign: 'left',
                        fontSize: 20,
                        paddingLeft: 15,
                        height: 48,
                        color: '#363636',
                      }}
                      value={this.state.password}
                      onChangeText={value => {
                        this.setState({
                          password: value,
                        });
                      }}
                    />
                  </View>
                </View>

                <Button
                  buttonStyle={{
                    borderRadius: 4,
                    backgroundColor: '#00A651',
                    padding: 10,
                    marginTop: 10,
                  }}

                  onPress={() => {
                    if (this.CheckTextInput()) {
                      let payload = { username: this.state.username, password: this.state.password }
                      console.log('Login => payload:', payload)
                      userApi.login(payload).then(res => {
                        console.log('res:', res);
                        if (res.status === 200 && res.data.success === true) {
                          Storage.setItem('user', res.data.data);
                          let users = res.data.data;
                          console.log('user:', res.data.data.full_name);
                          Toast.success(`Đăng nhập thành công\n Xin chào ${res.data.data.full_name}`, 0.5, () => {
                            switch (users.office) {
                              case 1:
                                this.props.navigation.navigate('AfterLoginOfManager', { user: res.data.data });
                                break;
                              case 2:
                                this.props.navigation.navigate('AfterLoginOfChef', { user: res.data.data });
                                break;
                              case 3:
                                this.props.navigation.navigate('AfterLoginOfCashier', { user: res.data.data });
                                break;
                              case 4:
                                this.props.navigation.navigate('AfterLoginOfServant', { user: res.data.data });
                                break;
                              default:
                                break;
                            }

                          });
                        }
                      })
                    }

                  }}
                  title="Đăng nhập"
                  titleStyle={{ fontSize: 20, textAlign: 'center', color: 'white' }}
                >
                </Button>
              </View>
            </ImageBackground>
          </View>
        </KeyboardAwareScrollView>
      </Provider>
    );
  }
}
