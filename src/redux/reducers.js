import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import todoApp from "./todo/reducer";

import surveyListApp from "./surveyList/reducer";
import surveyDetailApp from "./surveyDetail/reducer";
import schoolApp from "./school/reducer";

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  surveyListApp,
  surveyDetailApp,
  schoolApp,
});

export default reducers;
