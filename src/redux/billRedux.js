import produce from 'immer';

import { API_URLS } from '../config/api';
import { apiCall } from '../utils/api';
import { isCallingApi, isSuccessfulApiCall, isFailedApiCall } from './actionDedicate';
import { PREFIX, typesWithPrefix } from './config';
const _types = typesWithPrefix(PREFIX.BILL);
const TYPE = {
  CREATE_BILL: _types('CREATE_BILL'),
  CREATE_CUSTOMER: _types('CREATE_CUSTOMER'),
  GET_TABLES: _types('GET_TABLES'),
  GET_FOODS: _types('GET_FOODS'),
  ORDER_FOODS: _types('ORDER_FOODS'),
};

const initialState = {
  isFetching: false,
  didInvalidate: true,
};

const client = new WebSocket('ws://45.32.23.158:8000/ws/chat/order/')
let isLoadding = true;
client.onmessage = (message) => {
  console.log('message', message.data);
  const { type } = JSON.parse(message.data)
  if (type && type === 'confirm') {
    // actions.
  }
};

export const actions = {

  //get list tables
  getFoods: () => async (dispatch) => {
    const api = API_URLS.BILL.getFoods();
    dispatch(actions.gettingTables());
    const { response, error } = await apiCall(api);
    if (!error && response.status === 200) {
      console.log('billRedux => getFoods => response.data', response.data);
      dispatch(
        actions.getFoodsSuccess({
          tables: response.data.data,
        }),
      );
    } else {
      dispatch(actions.getFoodsFailure());
    }
    return { response, error }
  },
  gettingFoods: () => ({
    type: TYPE.GET_FOODS,
    meta: { prefix: [PREFIX.BILL, PREFIX.API_CALLING] },
  }),

  getFoodsSuccess: (payload) => ({
    type: TYPE.GET_FOODS,
    payload,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  getFoodsFailure: () => ({
    type: TYPE.GET_FOODS,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_FAILURE],
    },
  }),

  orderFoods: (payload, meta) => async (dispatch) => {
    // console.log('billRedux => orderFoods => payload:', payload)
    // const api = API_URLS.BILL.orderFoods(payload);
    dispatch(actions.orderingFoods());
    let data = {
      data: payload
    }
    console.log('billRedux => orderFoods => data:', data)
    client.send(JSON.stringify(data));
    console.log('finish')
    // console.log('billRedux => orderFoods => response:', response)
    // if (!error && response.status === 200) {
    //   dispatch(actions.orderFoodsSuccess());
    //   if (meta && meta.onSuccess) {
    //     meta.onSuccess();
    //   }
    // } else {
    //   dispatch(actions.orderFoodsFailure(error));
    //   if (meta && meta.onError) {
    //     meta.onError(error);
    //   }
    // }
    // return { response, error };
  },

  orderingFoods: () => ({
    type: TYPE.ORDER_FOODS,
    meta: { prefix: [PREFIX.BILL, PREFIX.API_CALLING] },
  }),

  orderFoodsSuccess: () => ({
    type: TYPE.ORDER_FOODS,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  orderFoodsFailure: () => ({
    type: TYPE.ORDER_FOODS,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_FAILURE],
    },
  }),

  createBill: (payload, meta) => async (dispatch) => {
    console.log('billRedux => createBill => payload:', payload)
    const api = API_URLS.BILL.createBill(payload);
    dispatch(actions.creatingBill());
    const { response, error } = await apiCall(api);
    console.log('billRedux => createBill => response:', response)
    if (!error && response.status === 200) {
      dispatch(actions.createBillSuccess());
      if (meta && meta.onSuccess) {
        meta.onSuccess();
      }
    } else {
      dispatch(actions.createBillFailure(error));
      if (meta && meta.onError) {
        meta.onError(error);
      }
    }
    return { response, error };
  },

  creatingBill: () => ({
    type: TYPE.CREATE_BILL,
    meta: { prefix: [PREFIX.BILL, PREFIX.API_CALLING] },
  }),

  createBillSuccess: () => ({
    type: TYPE.CREATE_BILL,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  createBillFailure: () => ({
    type: TYPE.CREATE_BILL,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_FAILURE],
    },
  }),


  createCustomer: (payload, meta) => async (dispatch) => {
    console.log('billRedux => createCustomer => payload:', payload)
    const api = API_URLS.BILL.createCustomer(payload);
    dispatch(actions.creatingCustomer());
    const { response, error } = await apiCall(api);
    console.log('billRedux => createCustomer => response:', response)
    if (!error && response.status === 200) {
      dispatch(actions.createCustomerSuccess());
      if (meta && meta.onSuccess) {
        meta.onSuccess();
      }
    } else {
      dispatch(actions.createCustomerFailure(error));
      if (meta && meta.onError) {
        meta.onError(error);
      }
    }
    return { response, error };
  },

  creatingCustomer: () => ({
    type: TYPE.CREATE_CUSTOMER,
    meta: { prefix: [PREFIX.BILL, PREFIX.API_CALLING] },
  }),

  createCustomerSuccess: () => ({
    type: TYPE.CREATE_CUSTOMER,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  createCustomerFailure: () => ({
    type: TYPE.CREATE_CUSTOMER,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_FAILURE],
    },
  }),

  //get list tables
  getTables: () => async (dispatch) => {
    const api = API_URLS.BILL.getTables();
    dispatch(actions.gettingTables());
    const { response, error } = await apiCall(api);
    if (!error && response.status === 200) {
      console.log('billRedux => getTables => response.data', response.data);
      dispatch(
        actions.getTablesSuccess({
          tables: response.data.data,
        }),
      );
    } else {
      dispatch(actions.getTablesFailure());
    }
    return { response, error }
  },
  gettingTables: () => ({
    type: TYPE.GET_TABLES,
    meta: { prefix: [PREFIX.BILL, PREFIX.API_CALLING] },
  }),

  getTablesSuccess: (payload) => ({
    type: TYPE.GET_TABLES,
    payload,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_SUCCESS],
    },
  }),

  getTablesFailure: () => ({
    type: TYPE.GET_TABLES,
    meta: {
      prefix: [PREFIX.BILL, PREFIX.API_CALLED_FAILURE],
    },
  }),

};

export const reducer = (state = initialState, action) =>
  produce(state, (draff) => {
    switch (action.type) {
      case TYPE.CREATE_BILL:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          draff.isFetching = false;
          draff.didInvalidate = false;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;
      case TYPE.CREATE_CUSTOMER:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          draff.isFetching = false;
          draff.didInvalidate = false;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;
      case TYPE.GET_TABLES:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          console.log('billRedux => getTables =>action.payload', action.payload)
          draff.isFetching = false;
          draff.didInvalidate = false;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;

      case TYPE.GET_FOODS:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          console.log('billRedux => getFoods =>action.payload', action.payload)
          draff.isFetching = false;
          draff.didInvalidate = false;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;

      case TYPE.ORDER_FOODS:
        if (isCallingApi(action)) {
          draff.isFetching = true;
        } else if (isSuccessfulApiCall(action)) {
          console.log('billRedux => orderFoods =>action.payload', action.payload)
          draff.isFetching = false;
          draff.didInvalidate = false;
        } else if (isFailedApiCall(action)) {
          draff.isFetching = false;
        }
        break;
      default:
        return draff;
    }
  });
