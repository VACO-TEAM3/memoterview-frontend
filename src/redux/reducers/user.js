import { takeLatest } from "@redux-saga/core/effects";

import { loginAPI } from "../lib/mockApi";
import { createPromiseSaga } from "../lib/sagaUtils";
import { ADD_MY_PROJECT_SUCCESS } from "./projects";

const BASE_PATH = "USER/";

// action types
export const CLEAR_USER = BASE_PATH + "CLEAR_USER";
export const GET_TOKEN = BASE_PATH + "GET_TOKEN";
export const GET_TOKEN_SUCCESS = BASE_PATH + "GET_TOKEN_SUCCESS";
export const GET_TOKEN_ERROR = BASE_PATH + "GET_TOKEN_ERROR";

export const loginUser = user => ({ type: GET_TOKEN, payload: user, meta: user });

const getTokenSaga = createPromiseSaga(GET_TOKEN, login);

export function* userSaga() {
  yield takeLatest(GET_TOKEN, getTokenSaga);
}

const userInitialState = {
  email: "",
  avatar: "",
  username: "",
  myProjects: [],
  joinedProjects: [],
};

const initialState = {
  loading: false,
  user: userInitialState,
  token: "",
  error: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER:
      return initialState;
    case GET_TOKEN:
      return {
        loading: true,
        user: null,
        error: null,
      };
    case GET_TOKEN_SUCCESS:
      return {
        loading: false,
        user: { ...action.payload },
        error: null, 
      };
    case GET_TOKEN_ERROR:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case ADD_MY_PROJECT_SUCCESS:
      const ids = action.payload.map(item => item.id);

      return {
        ...state,
        user: {
          ...state.user,
          myProjects: state.user.myProjects.concat(ids),
        },
      };
    default:
      return state;
  }
}
