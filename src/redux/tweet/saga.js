import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_STATISTICS_REQUEST } from "../actions";
import { getStatisticSuccess, getStatisticFailure } from "./actions";
import { getStatisticService } from "./services";

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

export function* watchStatisticSaga() {
  yield takeEvery(GET_STATISTICS_REQUEST, getStatisticSaga);
}

export default function* rootSaga() {
  yield all([fork(watchStatisticSaga)]);
}
