import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  user,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
