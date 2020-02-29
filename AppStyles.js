import { Platform } from 'react-native';

import Constants from './utils/Constants';

const _headerHeight = Constants.isTablet
  ? 56
  : Platform.OS === 'ios'
  ? Constants.isIphoneX
    ? 5
    : 40
  : 52;
const _toolbarHeight = Platform.OS === 'ios' ? (Constants.isIphoneX ? 35 : 5) : 5;

const _colorSet = {
  background: 'white',
  mainThemeForegroundColor: '#FF0025',
  activeColor: '#FF0025',
  alternativeColor: '#4CD964',
  inActiveColor: '#828282',
  mainTextColor: '#333333',
  mainSubtextColor: '#464646',

  black: '#000000',
  white: '#ffffff',
  red: 'red',
  organge: '#FF5055',
  lightGrey: '#828282',
  darkGrey: '#616161',
  border: '#D1D1D6',
  // common
  Text: '#333',
  Header: '#000',
  productTitle: '#404852',
  sectionBackground: '#fff',
  sectionSeparatorColor: '#D8D8D8',
  lineColor: '#f9f9f9',
};

const _fontSizeSet = {
  xxxlarge: 24,
  xxlarge: 22,
  xlarge: 20,
  large: 18,
  subLarge: 17,
  middle: 16,
  subMiddle: 15,
  normal: 14,
  subNormal: 13,
  small: 12,
  xsmall: 11,
};

if (Constants.isTablet) {
  Object.keys(_fontSizeSet).forEach(sizeKey => {
    _fontSizeSet[sizeKey] =
      _fontSizeSet[sizeKey] <= 18 ? _fontSizeSet[sizeKey] + 2 : _fontSizeSet[sizeKey] + 4;
  });
}

const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const _iconSizeSet = {
  large: 35,
  normal: 24,
  small: 20,
};

const _styleSet = {
  app: {
    flexGrow: 1,
  },

  toolbar: {
    marginTop: _toolbarHeight,
    backgroundColor: _colorSet.background,
    zIndex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    height: _headerHeight,

    ...Platform.select({
      ios: {
        // height: Constants.isIphoneX ? 5 : 40,
      },
      android: {
        // height: 52,
        paddingTop: 6,
        marginTop: 0,
        elevation: 0,
      },
    }),
  },

  headerStyle: {
    color: _colorSet.mainTextColor,
    fontSize: _fontSizeSet.subLarge,
    fontWeight: '600',
    lineHeight: 25,
    textAlign: 'left',
    alignSelf: 'center',
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    marginLeft: 5,

    // fontFamily: Constants.fontFamily,
    ...Platform.select({
      ios: {
        marginTop: Constants.isIphoneX ? -18 : 10,
        marginBottom: 0,
      },
      android: {
        marginTop: 14,
        marginBottom: 0,
      },
    }),
  },
  headerTitleStyle: {
    color: _colorSet.mainTextColor,
    fontSize: _fontSizeSet.middle,
    height: 40,
    textAlign: 'center',
    // fontFamily: Constants.fontFamily,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginBottom: 0,
        marginTop: Constants.isIphoneX ? -10 : 12,
      },
      android: {
        marginTop: 25,
      },
    }),
  },
  menuButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  columnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  ColumnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColumnCenterTop: {
    alignItems: 'center',
  },
  ColumnCenterBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ColumnCenterLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ColumnCenterRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navRow: {
    flexDirection: 'row',
    top: 0,
    ...Platform.select({
      ios: {
        top: Constants.isIphoneX ? -15 : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  navIconContainer: {
    ...Platform.select({
      ios: {
        top: Constants.isIphoneX ? -30 : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  // Table
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tableColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  tableItemTitle: {
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // fontFamily: fontSet.regular,
    fontSize: _fontSizeSet.normal,
    fontWeight: '600',
    color: _colorSet.mainTextColor,
  },
  tableItemSubTitle: {
    fontSize: _fontSizeSet.subNormal,
    color: _colorSet.mainSubtextColor,
    // fontFamily: fontSet.regular,
  },
  tableRowBackground: state => {
    let color = _colorSet.white;
    switch (state) {
      case Constants.stateList.shipping:
        color = _colorSet.order.shipping;
        break;
      case Constants.stateList.shipped:
        color = _colorSet.order.shipped;
        break;
      case Constants.stateList.completed:
        color = _colorSet.order.completed;
        break;
      case Constants.stateList.returned:
        color = _colorSet.order.returned;
        break;
      case Constants.stateList.cancelled:
        color = _colorSet.order.cancelled;
        break;
    }
    return {
      backgroundColor: color,
    };
  },
  tableSortIcon: {
    color: _colorSet.white,
    fontSize: _fontSizeSet.large,
  },

  // Modal
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 10,
    top: (Constants.Window.height * 7) / 100,
    // height: (Constants.Window.height * 83) / 100,
    width: (Constants.Window.width * 94) / 100,
    marginLeft: (Constants.Window.width * 3) / 100,
    // paddingHorizontal: 15,
    backgroundColor: _colorSet.background,
    // backgroundColor: 'rgba(51, 51, 51, 0.75)',
    zIndex: 10,
    // right: null,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  modalContainer: {
    paddingVertical: 25,
    maxHeight: '100%',
  },

  modalInfo: {
    paddingHorizontal: 25,
    maxWidth: 600,
  },
};

const _fontSet = {
  regular: 'AppleSDGothicNeo-Regular',
  bold: 'AppleSDGothicNeo-Bold',
};

export const colorSet = _colorSet;
export const iconSizeSet = _iconSizeSet;
export const sizeSet = _sizeSet;
export const styleSet = _styleSet;
export const fontSet = _fontSet;
export const fontSizeSet = _fontSizeSet;
export const headerHeight = _toolbarHeight + _headerHeight;
