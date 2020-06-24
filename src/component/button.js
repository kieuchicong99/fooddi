import React from 'react';
import { Button as ButtonOrigin } from 'react-native-elements';

import Colors from '../utils/Colors';
const ButtonType = {
  first: 'first',
  second: 'second',
  third: 'third',
  fourth: 'fourth',
  fiveth: 'fiveth',
};

export const BaseButton = (props) => {
  const { buttonStyle, titleStyle, title, onPress } = props;
  return (
    <ButtonOrigin
      buttonStyle={{ borderRadius: 4, padding: 10, ...buttonStyle }}
      titleStyle={{
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: '500',
        color: Colors.white,
        ...titleStyle,
      }}
      title={title ? title : ''}
      onPress={onPress}
    />
  );
};

export const Button = (props) => {
  const { type, title, titleStyle, buttonStyle, onPress } = props;
  switch (type) {
    case ButtonType.first:
      return (
        <BaseButton
          buttonStyle={{ backgroundColor: Colors.greenMain, ...buttonStyle }}
          title={title ? title : ''}
          onPress={onPress}
        />
      );
    case ButtonType.second:
      return (
        <BaseButton
          buttonStyle={{ backgroundColor: Colors.redMain, ...buttonStyle }}
          title={title ? title : ''}
          onPress={onPress}
        />
      );
    case ButtonType.third:
      return (
        <BaseButton
          buttonStyle={{ backgroundColor: Colors.greenMain15, ...buttonStyle }}
          titleStyle={{
            color: Colors.greenMain,
            ...titleStyle,
          }}
          title={title ? title : ''}
          onPress={onPress}
        />
      );
    case ButtonType.fourth:
      return (
        <BaseButton
          buttonStyle={{ backgroundColor: Colors.redMain15, ...buttonStyle }}
          titleStyle={{
            color: Colors.redMain,
            ...titleStyle,
          }}
          title={title ? title : ''}
          onPress={onPress}
        />
      );
    case ButtonType.fiveth:
      return (
        <BaseButton
          buttonStyle={{
            backgroundColor: Colors.redMain15,
            borderRadius: 25,
            ...buttonStyle,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          titleStyle={{
            color: Colors.redMain,
            ...titleStyle,
          }}
          title={title ? title : ''}
          onPress={onPress}
        />
      );
    default:
      return (
        <BaseButton
          buttonStyle={buttonStyle}
          title={title}
          titleStyle={titleStyle}
          onPress={onPress}
        />
      );
  }
};
