/** @format */

import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

Reactotron.configure({ name: 'Stater' });

Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] },
});

Reactotron.use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
