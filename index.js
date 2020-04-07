/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Store from './src/redux/store/Store';
import React from 'react';

const store = Store();

const ReactNativeRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

import codePush from 'react-native-code-push';
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
const StarterApp = codePush(codePushOptions)(ReactNativeRedux);

AppRegistry.registerComponent(appName, () => StarterApp);
