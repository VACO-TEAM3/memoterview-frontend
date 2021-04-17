import { takeLatest, takeLeading } from "redux-saga/effects";

import { addProjectAPI, getJoinedProjectsAPI, getMyProjectsAPI } from "../lib/mockApi";
import { handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
import {
  createPromiseSaga,
} from "../lib/sagaUtils";

const GET_MY_PROJECTS = "GET_MY_PROJECTS";
const GET_MY_PROJECTS_SUCCESS = "GET_MY_PROJECTS_SUCCESS";
const GET_MY_PROJECTS_ERROR = "GET_MY_PROJECTS_ERROR";

const GET_JOINED_PROJECTS = "GET_JOINED_PROJECTS";
const GET_JOINED_PROJECTS_SUCCESS = "GET_JOINED_PROJECTS_SUCCESS";
const GET_JOINED_PROJECTS_ERROR = "GET_JOINED_PROJECTS_ERROR";

const ADD_MY_PROJECT = "ADD_MY_PROJECTS";
export const ADD_MY_PROJECT_SUCCESS = "ADD_MY_PROJECTS_SUCCESS";
const ADD_MY_PROJECT_ERROR = "ADD_MY_PROJECTS_ERROR";

export const getMyProjects = userId => ({ type: GET_MY_PROJECTS, payload: userId, meta: userId });
export const getJoinedProjects = userId => ({ type: GET_JOINED_PROJECTS, payload: userId, meta: userId });
export const addMyProjects = ({ userId, newProject }) => ({ type: ADD_MY_PROJECT, payload: { userId, newProject }, meta: { userId, newProject } });

const getMyProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getMyProjectsAPI);
const getJoinedProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getJoinedProjectsAPI);
const addMyProjectSaga = createPromiseSaga(ADD_MY_PROJECT, addProjectAPI);

export function* projectsSaga() {
  yield takeLeading(GET_MY_PROJECTS, getMyProjectsSaga);
  yield takeLeading(GET_JOINED_PROJECTS, getJoinedProjectsSaga);
  yield takeLatest(ADD_MY_PROJECT, addMyProjectSaga);
}

const projectInitialState = {
  id: "",
  title: "",
  candidates: [],
  status: "",
  isOpend: false,
  creator: "",
  filters: [],
  participants: [],
};

const initialState = {
  loading: false,
  byId: {},
  allIds: [],
  error: null,
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_MY_PROJECTS:
    case GET_MY_PROJECTS_SUCCESS:
    case GET_MY_PROJECTS_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(GET_MY_PROJECTS, true)(state, action);
    case GET_JOINED_PROJECTS:
    case GET_JOINED_PROJECTS_SUCCESS:
    case GET_JOINED_PROJECTS_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(GET_MY_PROJECTS, true)(state, action);
    case ADD_MY_PROJECT:
    case ADD_MY_PROJECT_SUCCESS:
    case ADD_MY_PROJECT_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(ADD_MY_PROJECT, true)(state, action);
    default:
      return state;
  }
}