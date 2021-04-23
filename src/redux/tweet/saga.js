import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_STATISTICS_REQUEST, GET_RATIO_REQUEST } from '../actions';
import {
  getStatisticSuccess,
  getStatisticFailure,
  getRatioSuccess,
  getRatioFailure,
} from './actions';
import { getStatisticService, getRatioService } from './services';

function* getStatisticSaga({ payload }) {
  const { types, callBack } = payload;
  try {
    const response = yield call(getStatisticService, types);

    if (callBack) {
      callBack(response);
    }
    yield put(getStatisticSuccess(response, types));
  } catch (error) {
    yield put(getStatisticFailure(error));
  }
}

function* getRatioSaga({ payload }) {
  // const { types, callBack } = payload;
  try {
    const response = yield call(getRatioService);
    yield put(getRatioSuccess(response));
  } catch (error) {
    yield put(getRatioFailure(error));
  }
}

export function* watchStatisticSaga() {
  yield takeEvery(GET_STATISTICS_REQUEST, getStatisticSaga);
}

export function* watchRatioSaga() {
  yield takeEvery(GET_RATIO_REQUEST, getRatioSaga);
}

export default function* rootSaga() {
  yield all([fork(watchStatisticSaga)]);
  yield all([fork(watchRatioSaga)]);
}
