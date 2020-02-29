/**
 * Created by Anvita on 17/02/2017.
 *
 * @format
 */
import { Platform, Linking, Alert } from 'react-native';
import reactotron from 'reactotron-react-native';
import _moment from 'moment';
import 'moment/locale/vi';
import _EventEmitter from 'EventEmitter';
import _Timer from 'react-timer-mixin';
import _Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _IconIO from 'react-native-vector-icons/Ionicons';
import _IconMI from 'react-native-vector-icons/MaterialIcons';
import IntlPolyfill from 'intl';
import './libs/vi-VN';

import _Constants from './Constants';
import _Languages from './Languages';
import _Images from './Images';
// import { createIconSetFromFontello } from 'react-native-vector-icons';
// import ubofoodFontConfig from './fonts/fontello-ubofood_icon.json';

_moment.locale('vi');

// export const UboIcon = createIconSetFromFontello(
//   ubofoodFontConfig
//   // 'ubofood_icon',
//   // 'ubofood_icon.ttf'
// );

export const moment = _moment;
export const EventEmitter = new _EventEmitter();
export const Timer = _Timer;

export const Icon = _Icon;
export const IconIO = _IconIO;
export const IconMI = _IconMI;
export const Languages = _Languages;
export const Constants = _Constants;
export const Images = _Images;

const _log = values => {
  if (__DEV__) {
    reactotron.log(values);
    if (Platform.OS === 'android') {
      console.log(values);
    }
  }
};
const _warn = values => __DEV__ && reactotron.warn(values);
const _error = values => __DEV__ && reactotron.error(values);
export const log = _log;
export const warn = _warn;
export const error = _error;

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
const _toast = (msg, duration = 3000) =>
  EventEmitter.emit(_Constants.EmitCode.Toast, msg, duration);

export const toast = _toast;

const _showAlert = (title, message, onOK) => {
  const buttons = [
    {
      text: Languages.Cancel,
    },
  ];
  if (onOK) {
    buttons.push({ text: Languages.Sure, onPress: onOK });
  }
  Alert.alert(title, message, buttons);
};

export const showAlert = _showAlert;

export const numberFormatter = number => {
  return new IntlPolyfill.NumberFormat('vi-VN').format(number);
};

export const currencyFormatter = price => {
  if (typeof price === 'string') {
    return price;
  } else if (!price && price !== 0) {
    return '';
  }

  return new IntlPolyfill.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const _isoMomentFormatter = momentDate => {
  return `${momentDate.format(_Constants.isoDateFormat)}${_Constants.defaultISOTime}`;
};

export const todayISODate = () => _isoMomentFormatter(_moment());

export const isoDateFormatter = dateString => {
  return _isoMomentFormatter(_moment(dateString));
};

export const oneDateRangeISO = date => {
  const mainDate = date ? _moment(date) : _moment();
  return [_isoMomentFormatter(mainDate), _isoMomentFormatter(mainDate)];
};

export const callCustomer = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        _toast('Có lỗi khi gọi điện');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => log(err));
};

export const buildCustomerAddress = address => {
  let fullAddress = address.Text ? `${address.Text}, ` : '';
  fullAddress += address.Ward ? `${address.Ward.Name}, ` : '';
  fullAddress += address.District ? `${address.District.Name}, ` : '';
  fullAddress += address.City ? `${address.City.Name}` : '';

  return fullAddress;
};

export const calculateDateParam = selectedDate => {
  switch (selectedDate) {
    case Constants.dateOptions.all.key:
      return undefined;
    case Constants.dateOptions.tomorrow.key:
      return oneDateRangeISO(moment().add(1, 'days'));
    case Constants.dateOptions.today.key:
      return oneDateRangeISO();
    case Constants.dateOptions.yesterday.key:
      return oneDateRangeISO(moment().subtract(1, 'days'));
    case Constants.dateOptions['2dayago'].key:
      return oneDateRangeISO(moment().subtract(2, 'days'));
    case Constants.dateRangeOptions.this_week.key:
      return [isoDateFormatter(moment().startOf('week')), isoDateFormatter(moment().endOf('week'))];
    case Constants.dateRangeOptions.last_week.key:
      return [
        isoDateFormatter(
          moment()
            .subtract(1, 'weeks')
            .startOf('week')
        ),
        isoDateFormatter(
          moment()
            .subtract(1, 'weeks')
            .endOf('week')
        ),
      ];
    case Constants.dateRangeOptions.this_month.key:
      return [
        isoDateFormatter(moment().startOf('month')),
        isoDateFormatter(moment().endOf('month')),
      ];
    case Constants.dateRangeOptions.last_month.key:
      return [
        isoDateFormatter(
          moment()
            .subtract(1, 'months')
            .startOf('month')
        ),
        isoDateFormatter(
          moment()
            .subtract(1, 'months')
            .endOf('month')
        ),
      ];
    case Constants.dateRangeOptions.year_to_date.key:
      return [isoDateFormatter(moment().startOf('year')), isoDateFormatter(moment().endOf('year'))];
    default:
      return [isoDateFormatter(selectedDate.startDay), isoDateFormatter(selectedDate.endDay)];
  }
};
