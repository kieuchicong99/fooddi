import { combineReducers } from 'redux';

import { reducer as userReducer } from './userRedux';

export default combineReducers({
  userReducer
});
