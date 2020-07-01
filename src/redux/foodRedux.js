import produce from 'immer';

import { API_URLS } from '../config/api';
import { apiCall } from '../utils/api';
import { isCallingApi, isSuccessfulApiCall, isFailedApiCall } from './actionDedicate';
import { PREFIX, typesWithPrefix } from './config';
const _types = typesWithPrefix(PREFIX.ACCOUNT);
const TYPE = {
    GET_FOODS: _types('GET_FOODS'),
    UPDATE_FOOD: _types('UPDATE_FOOD'),
    DELETE_FOOD: _types('DELETE_FOOD'),
};
export const actions = {
    //get list food
    getFoods: () => async (dispatch) => {
        const api = API_URLS.FOOD.getFoods();
        dispatch(actions.gettingFoods());
        const { response, error } = await apiCall(api);
        if (!error && response.status === 200) {
            console.log('FoodRedux => response.data', response.data);
            dispatch(
                actions.getFoodsSuccess({
                    items: response.data.data,
                }),
            );
        } else {
            dispatch(actions.getFoodsFailure());
        }
    },
    gettingFoods: () => ({
        type: TYPE.GET_FOODS,
        meta: { prefix: [PREFIX.FOOD, PREFIX.API_CALLING] },
    }),

    getFoodsSuccess: (payload) => ({
        type: TYPE.GET_FOODS,
        payload,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_SUCCESS],
        },
    }),

    getFoodsFailure: (query) => ({
        type: TYPE.GET_FOODS,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_FAILURE],
        },
    }),

    // update food
    updatingFood: () => ({
        type: TYPE.UPDATE_FOOD,
        meta: { prefix: [PREFIX.FOOD, PREFIX.API_CALLING] },
    }),
    updateFoodSuccess: () => ({
        type: TYPE.UPDATE_FOOD,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_SUCCESS],
        },
    }),
    updateFoodFailure: () => ({
        type: TYPE.UPDATE_FOOD,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_FAILURE],
        },
    }),
    updateFood: (foodId, payload, meta) => async (dispatch) => {
        const api = API_URLS.FOOD.updateFood(foodId, payload);
        dispatch(actions.updatingFood());
        const { response, error } = await apiCall(api);
        console.log('foodRedux => response:', response)
        if (!error && response.status === 200) {
            dispatch(actions.updateFoodSuccess(response.data));
            if (meta && meta.onSuccess) {
                meta.onSuccess();
            }
        } else {
            dispatch(actions.updateFoodFailure(error));
            if (meta && meta.onError) {
                meta.onError(error);
            }
        }
    },

    // Delete
    deletingFood: () => ({
        type: TYPE.DELETE_FOOD,
        meta: { prefix: [PREFIX.FOOD, PREFIX.API_CALLING] },
    }),

    deleteFoodSuccess: () => ({
        type: TYPE.DELETE_FOOD,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_SUCCESS],
        },
    }),

    deleteFoodFailure: () => ({
        type: TYPE.DELETE_FOOD,
        meta: {
            prefix: [PREFIX.FOOD, PREFIX.API_CALLED_FAILURE],
        },
    }),

    deleteFood: (foodId, meta) => async (dispatch) => {
        const api = API_URLS.FOOD.deleteFood(foodId);
        dispatch(actions.deletingFood());
        const { response, error } = await apiCall(api);
        if (!error && response.status === 200) {
            dispatch(actions.deleteFoodSuccess(response.data));
            if (meta && meta.onSuccess) {
                meta.onSuccess();
            }
        } else {
            dispatch(actions.deleteFoodFailure(error));
            if (meta && meta.onError) {
                meta.onError(error);
            }
        }
    },

    // insertFood
    insertFood: (payload, meta) => async () => {
        console.log('foodRedux => insertFood => payload:', JSON.stringify(payload))
        const api = API_URLS.FOOD.insertFood(payload);
        const { response, error } = await apiCall(api);
        console.log('foodRedux => insertFood => response:', response)
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
            case TYPE.GET_FOODS:
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
            case TYPE.UPDATE_FOOD:
            case TYPE.DELETE_FOOD:
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
