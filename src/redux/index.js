import { combineReducers } from 'redux';

import { reducer as userReducer } from './userRedux';
import { reducer as billReducer } from './billRedux';
export default combineReducers({
  userReducer,
  billReducer
});
