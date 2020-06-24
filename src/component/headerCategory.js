import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Colors from '../utils/Colors';

const headerCategory = (type, props) => {
  console.log('HeaderCategory props:', props);

  if (type === 'showInBackgroundImage') {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#363636', 'rgba(0, 166, 81, 0)']}
        style={{
          opacity: 0.95,
          position: 'absolute',
          top: 0,
          height: 78,
          width: '100%',
          zIndex: 10,
        }}>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: 30,
              marginTop: 30,
            }}>
            <View style={{ paddingRight: 20, paddingLeft: 20 }}>
              <TouchableOpacity
                style={{ width: 30, height: 30 }}
                onPress={() => {
                  console.log('helo');
                  console.log('props:', props);
                  props.navigation.navigate('ListCategory');
                }}>
                <AntDesignIcon name="left" size={25} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%' }}>
              <TouchableOpacity
                style={{ width: '45%', height: 30 }}
                onPress={() => {
                  console.log('helo');
                  console.log('props:', props);
                  props.navigation.navigate('ListCategory');
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.white,
                    fontWeight: '500',
                  }}>
                  {/* {nameScreen} */}
                  Chọn bàn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
  if (type === 'showInBackgroundColor') {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 78,
          width: '100%',
          zIndex: 10,
          backgroundColor: Colors.grayLightMain,
          color: Colors.blackMain,
          borderBottomColor: Colors.grayDarkMain,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 30,
            marginTop: 30,
          }}>
          <View style={{ paddingRight: 20, paddingLeft: 20 }}>
            <TouchableOpacity
              style={{ width: 30, height: 30 }}
              onPress={() => {
                console.log('helo');
                console.log('props:', props);
                props.navigation.navigate('ListCategory');
              }}>
              <AntDesignIcon name="left" size={25} color={Colors.blackMain} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%' }}>
            <TouchableOpacity
              style={{ width: '45%', height: 30 }}
              onPress={() => {
                console.log('helo');
                console.log('props:', props);
                props.navigation.navigate('ListCategory');
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.blackMain,
                  fontWeight: '500',
                }}>
                {/* {nameScreen} */}
                Chọn bàn
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
};
export default headerCategory;
