/** @format */
import Reactotron from 'reactotron-react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import '../utils/ReactotronConfig';
// import AsyncStorage from '@react-native-community/async-storage';
import rootReducers from './index'


const Store = () => {
  let store = null;
  if (__DEV__) {
    store = createStore(
      rootReducers,
      {},
      compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
    );
  } else {
    store = compose(applyMiddleware(thunk))(createStore)(rootReducers);
  }
  return store;
};

export default Store;
