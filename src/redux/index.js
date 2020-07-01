import { combineReducers } from 'redux';

import { reducer as userReducer } from './userRedux';
import { reducer as billReducer } from './billRedux';
import { reducer as foodReducer } from './foodRedux';
export default combineReducers({
  userReducer,
  billReducer,
  foodReducer
});
