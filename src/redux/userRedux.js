import produce from 'immer';

import { API_URLS } from '../config/api';
import { apiCall } from '../utils/api';
import { isCallingApi, isSuccessfulApiCall, isFailedApiCall } from './actionDedicate';
import { PREFIX, typesWithPrefix } from './config';
const _types = typesWithPrefix(PREFIX.ACCOUNT);
const TYPE = {
  GET_USERS: _types('GET_USERS'),
  UPDATE_USER: _types('UPDATE_USER'),
  DELETE_USER: _types('DELETE_USER'),
};
export const actions = {
  //get list user
  getUsers: () => async (dispatch) => {
    const api = API_URLS.USER.getUsers();
    dispatch(actions.gettingUsers());
    const { response, error } = await apiCall(api);
    if (!error && response.status === 200) {
      console.log('UserRedux => response.data', response.data);
      dispatch(
        actions.getUsersSuccess({
          items: response.data.data,
        }),
      );
    } else {
      dispatch(actions.getUsersFailure());
    }
  },
  gettingUsers: () => ({
    type: TYPE.GET_USERS,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  }),

  getUsersSuccess: (payload) => ({
    type: TYPE.GET_USERS,
    payload,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  getUsersFailure: (query) => ({
    type: TYPE.GET_USERS,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_FAILURE],
    },
  }),

  // update user
  updatingUser: () => ({
    type: TYPE.UPDATE_USER,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  }),
  updateUserSuccess: () => ({
    type: TYPE.UPDATE_USER,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_SUCCESS],
    },
  }),
  updateUserFailure: () => ({
    type: TYPE.UPDATE_USER,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_FAILURE],
    },
  }),
  updateUser: (userId, payload, meta) => async (dispatch) => {
    const api = API_URLS.USER.updateUser(userId, payload);
    dispatch(actions.updatingUser());
    const { response, error } = await apiCall(api);
    console.log('userRedux => response:', response)
    if (!error && response.status === 200) {
      dispatch(actions.updateUserSuccess(response.data));
      if (meta && meta.onSuccess) {
        meta.onSuccess();
      }
    } else {
      dispatch(actions.updateUserFailure(error));
      if (meta && meta.onError) {
        meta.onError(error);
      }
    }
  },

  // Delete
  deletingUser: () => ({
    type: TYPE.DELETE_USER,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  }),

  deleteUserSuccess: () => ({
    type: TYPE.DELETE_USER,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  deleteUserFailure: () => ({
    type: TYPE.DELETE_USER,
    meta: {
      prefix: [PREFIX.USER, PREFIX.API_CALLED_FAILURE],
    },
  }),

  deleteUser: (userId, meta) => async (dispatch) => {
    const api = API_URLS.USER.deleteUser(userId);
    dispatch(actions.deletingUser());
    const { response, error } = await apiCall({ ...api });
    if (!error && response.status === 200) {
      dispatch(actions.deleteUserSuccess(response.data));
      if (meta && meta.onSuccess) {
        meta.onSuccess();
      }
    } else {
      dispatch(actions.deleteUserFailure(error));
      if (meta && meta.onError) {
        meta.onError(error);
      }
    }
  },

  // insertUser
  insertUser: (payload, meta) => async () => {
    const api = API_URLS.USER.insertUser(payload);
    const { response, error } = await apiCall(api);
    if (!error && (response.status === 200 || response.status === 201)) {
      if (meta && meta.onSuccess) {
        meta.onSuccess();
      }
    } else if (meta && meta.onError) {
      meta.onError(error);
    }
    return { response, error };
  },


};

const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
};

export const reducer = (state = initialState, action) =>
  produce(state, (draff) => {
    switch (action.type) {
      case TYPE.GET_USERS:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          const { items } = action.payload;
          draff.isFetching = false;
          draff.didInvalidate = false;
          draff.items = items;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;
      case TYPE.UPDATE_USER:
      case TYPE.DELETE_USER:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        }
        if (isSuccessfulApiCall(action)) {
          draff.isFetching = false;
          draff.didInvalidate = true;
        }
        if (isFailedApiCall(action)) {
          draff.isFetching = false;
          draff.didInvalidate = false;
        }
        break;
      default:
        return draff;
    }
  });
