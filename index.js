/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import React from 'react';
import codePush from 'react-native-code-push';

console.log('redux: store', store().getState());

const ReactNativeRedux = () => (
  <Provider store={store()}>
    <App />
  </Provider>
);


const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
const StarterApp = codePush(codePushOptions)(ReactNativeRedux);

AppRegistry.registerComponent(appName, () => StarterApp);
