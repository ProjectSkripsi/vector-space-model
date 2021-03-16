import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import todoSagas from "./todo/saga";

import surveyListSagas from "./surveyList/saga";
import surveyDetailSagas from "./surveyDetail/saga";
import tweetSagas from "./tweet/saga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    todoSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    tweetSagas(),
  ]);
}
