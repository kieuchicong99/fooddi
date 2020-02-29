/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  PushNotificationIOS,
} from 'react-native';
const background = require('../../assets/login.jpg');
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <ImageBackground
            source={background}
            style={{width: '100%', height: '100%'}}>
            <View
              style={{
                padding: 40,
                top: '40%',
              }}>
              <TextInput
                placeholder="Enter password"
                style={{
                  backgroundColor: 'white',
                  textAlign: 'center',
                  borderRadius: 15,
                  fontSize: 24,
                }}></TextInput>

              <TouchableOpacity
                activeOpacity={0.05}
                style={{
                  borderRadius: 15,
                  backgroundColor: 'green',
                  textAlign: 'center',
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate('AfterLogin');
                }}>
                <Text
                  style={{fontSize: 24, textAlign: 'center', color: 'white'}}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
