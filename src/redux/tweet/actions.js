import {
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
  GET_RATIO_REQUEST,
  GET_RATIO_SUCCESS,
  GET_RATIO_ERROR,
} from '../actions';

export const getStatisticRequest = (types, callBack) => ({
  type: GET_STATISTICS_REQUEST,
  payload: { types, callBack },
});

export const getStatisticSuccess = (response, types) => ({
  type: GET_STATISTICS_SUCCESS,
  payload: { response, types },
});

export const getStatisticFailure = (error) => ({
  type: GET_STATISTICS_ERROR,
  payload: { error },
});

export const getRatioRequest = (types, callBack) => ({
  type: GET_RATIO_REQUEST,
  payload: { types, callBack },
});

export const getRatioSuccess = (response, types) => ({
  type: GET_RATIO_SUCCESS,
  payload: { response, types },
});

export const getRatioFailure = (error) => ({
  type: GET_RATIO_ERROR,
  payload: { error },
});
