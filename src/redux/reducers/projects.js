import { takeLeading } from "redux-saga/effects";

import { getJoinedProjectsAPI, getMyProjectsAPI } from "../lib/mockApi";
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

export const getMyProjects = uid => ({ type: GET_MY_PROJECTS, payload: uid, meta: uid });
export const getJoinedProjects = uid => ({ type: GET_JOINED_PROJECTS, payload: uid, meta: uid });

const getMyProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getMyProjectsAPI);
const getJoinedProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getJoinedProjectsAPI);

export function* projectsSaga() {
  yield takeLeading(GET_MY_PROJECTS, getMyProjectsSaga);
  yield takeLeading(GET_JOINED_PROJECTS, getJoinedProjectsSaga);
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
    default:
      return state;
  }
}
