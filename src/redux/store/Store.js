/** @format */
import Reactotron from 'reactotron-react-native';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import '../../utils/ReactotronConfig';
import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';
import {persistCombineReducers} from 'redux-persist';
const middleware = [
  thunk,
  // more middleware
];

const types = {
  HAS_NEW_VERSION: 'HAS_NEW_VERSION',
  CHECK_NEW_APP_VERSION: 'CHECK_NEW_APP_VERSION',
};

const initialState = {
  hasNewVersion: false,
  lastCheckTime: 0,
};
const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['netInfo', 'toast'],
};

const appReducer = produce((draff, action) => {
  const {type} = action;

  switch (type) {
    case types.HAS_NEW_VERSION:
      draff.hasNewVersion = action.hasNewVersion;
      draff.lastCheckTime = action.now;
      break;
    default:
  }
}, initialState);

const rootReducers = persistCombineReducers(config, {
  app: appReducer,
});

const Store = () => {
  let store = null;
  if (__DEV__) {
    store = createStore(
      rootReducers,
      {},
      compose(applyMiddleware(...middleware), Reactotron.createEnhancer()),
    );
  } else {
    store = compose(applyMiddleware(...middleware))(createStore)(rootReducers);
  }
  return store;
};

export default Store;
