/**
 * Created by Anvita on 20/12/2016.
 *
 * @format
 */

import { Dimensions, Platform } from 'react-native';
import Languages from './Languages';

const { width, height } = Dimensions.get('window');
const minTabletWidth = 581;
const isIphoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height >= 812 || width >= 812);
const isTablet = Platform.isPad || (width >= minTabletWidth && height >= minTabletWidth);

const Constants = {
  devDomain: 'https://dev.euronutrition.eu/api',
  appStoreId: '',
  bundleId: '',
  isIphoneX,
  isTablet,
  minTabletWidth,
  VND: '₫',
  isoDateFormat: 'YYYY-MM-DD',
  defaultISOTime: 'T07:00:01Z',
  shortDateFormat: 'D-M-YY',
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm',
  pageSize: 20,
  fontFamily: 'Roboto-Regular',
  fontHeader: 'Roboto-Regular',
  EmitCode: {
    Toast: 'toast',
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent;
    },
  },
  Window: {
    width,
    height: Platform.OS !== 'ios' ? height : height - 20,
  },
};

export default Constants;
