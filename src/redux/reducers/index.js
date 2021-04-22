import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import interviewee, { intervieweeSaga } from "./interviewee";
import projects, { projectsSaga } from "./projects";
import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  user,
  projects,
  interviewee,
});

export function* rootSaga() {
  yield all([userSaga(), projectsSaga(), intervieweeSaga()]);
}

export default rootReducer;
