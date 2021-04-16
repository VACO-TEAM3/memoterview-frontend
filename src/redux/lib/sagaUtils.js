import { call, put } from "redux-saga/effects";

import { makeRelatedActionTypes } from "./reducerUtils";

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = makeRelatedActionTypes(type);

  return function* saga(action) {
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (error) {
      yield put({ type: ERROR, error: true, payload: error });
    }
  };
};

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = makeRelatedActionTypes(type);
  
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (error) {
      yield put({ type: ERROR, error: error, meta: id });
    }
  };
};
