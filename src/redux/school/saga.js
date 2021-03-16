import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  SUBMIT_NEW_SCHOOL_REQUEST,
  DELETE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_REQUEST,
} from '../actions';
import {
  submitSchoolSuccess,
  submitSchoolFailure,
  deleteSchoolSuccess,
  deleteSchoolFailure,
  updateSchoolSuccess,
  updateSchoolFailure,
} from './actions';
import {
  submitSchoolService,
  deleteSchoolService,
  updateSchoolService,
} from './services';

function* submitSchoolSaga({ payload }) {
  try {
    const response = yield call(submitSchoolService, payload);
    const { callBack } = payload;
    if (callBack) {
      callBack(response);
    }
    yield put(submitSchoolSuccess(response));
  } catch (error) {
    yield put(submitSchoolFailure(error));
  }
}

function* deleteSchoolSaga({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(deleteSchoolService, id);
    const { callBack } = payload;
    if (callBack) {
      callBack(response);
    }
    yield put(deleteSchoolSuccess(response));
  } catch (error) {
    yield put(deleteSchoolFailure(error));
  }
}

function* updateSchoolSaga({ payload }) {
  const { id, data } = payload;
  try {
    const response = yield call(updateSchoolService, id, data);
    const { callBack } = payload;
    if (callBack) {
      callBack(response);
    }
    yield put(updateSchoolSuccess(response));
  } catch (error) {
    yield put(updateSchoolFailure(error));
  }
}

export function* watchSubmitSchoolSaga() {
  yield takeEvery(SUBMIT_NEW_SCHOOL_REQUEST, submitSchoolSaga);
}

export function* watchDeleteSchoolSaga() {
  yield takeEvery(DELETE_SCHOOL_REQUEST, deleteSchoolSaga);
}

export function* watchUpdateSchoolSaga() {
  yield takeEvery(UPDATE_SCHOOL_REQUEST, updateSchoolSaga);
}

export default function* rootSaga() {
  yield all([fork(watchSubmitSchoolSaga)]);
  yield all([fork(watchDeleteSchoolSaga)]);
  yield all([fork(watchUpdateSchoolSaga)]);
}
