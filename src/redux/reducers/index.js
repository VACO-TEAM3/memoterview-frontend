import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import projects, { projectsSaga } from "./projects";
import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  user,
  projects,
});

export function* rootSaga() {
  yield all([userSaga(), projectsSaga()]);
}

export default rootReducer;
