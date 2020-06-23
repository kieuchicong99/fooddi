/**
 * Created by ckc on 2020.
 *
 * @format
 */

import { Dimensions, Platform } from 'react-native';

const Constants = {

  Dimension: {
    screenWidth: Math.round(Dimensions.get('window').width),
    screenHeight: Math.round(Dimensions.get('window').height),
  },
};

export default Constants;
