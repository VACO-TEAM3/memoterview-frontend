import { takeLatest, takeLeading } from "redux-saga/effects";

import { deleteProjectAPI, getJoinedProjectsAPI, getMyProjectsAPI } from "../../api";
import { PROJECT_TYPES } from "../../constants/projects";
import { addProjectAPI } from "../lib/mockApi";
import {
  deleteProjectByProjectId,
  getProjectsByProjectType,
  handleAsyncRemoveStateActionsWithNormalize,
  handleAsyncUpdateStateActionsWithNormalize,
} from "../lib/reducerUtils";
import { createPromiseSaga } from "../lib/sagaUtils";

const GET_MY_PROJECTS = "GET_MY_PROJECTS";
const GET_MY_PROJECTS_SUCCESS = "GET_MY_PROJECTS_SUCCESS";
const GET_MY_PROJECTS_ERROR = "GET_MY_PROJECTS_ERROR";

const GET_JOINED_PROJECTS = "GET_JOINED_PROJECTS";
const GET_JOINED_PROJECTS_SUCCESS = "GET_JOINED_PROJECTS_SUCCESS";
const GET_JOINED_PROJECTS_ERROR = "GET_JOINED_PROJECTS_ERROR";

const ADD_MY_PROJECT = "ADD_MY_PROJECTS";
export const ADD_MY_PROJECT_SUCCESS = "ADD_MY_PROJECTS_SUCCESS";
const ADD_MY_PROJECT_ERROR = "ADD_MY_PROJECTS_ERROR";

const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR";

export const getMyProjects = ({ userId, token }) => ({
  type: GET_MY_PROJECTS,
  payload: { userId, token },
  meta: userId,
});

export const getJoinedProjects = ({ userId, token }) => ({
  type: GET_JOINED_PROJECTS,
  payload: { userId, token },
  meta: userId,
});

export const addMyProjects = ({ userId, newProject }) => ({
  type: ADD_MY_PROJECT,
  payload: { userId, newProject },
  meta: { userId, newProject },
});

export const deleteProject = ({ projectId, token }) => ({
  type: DELETE_PROJECT,
  payload: { projectId, token },
  meta: projectId,
});

const getMyProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getMyProjectsAPI);
const getJoinedProjectsSaga = createPromiseSaga(GET_JOINED_PROJECTS, getJoinedProjectsAPI);
const addMyProjectSaga = createPromiseSaga(ADD_MY_PROJECT, addProjectAPI);
const deleteProjectSaga = createPromiseSaga(DELETE_PROJECT, deleteProjectAPI);

export function* projectsSaga() {
  yield takeLeading(GET_MY_PROJECTS, getMyProjectsSaga);
  yield takeLeading(GET_JOINED_PROJECTS, getJoinedProjectsSaga);
  yield takeLatest(ADD_MY_PROJECT, addMyProjectSaga);
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
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
  visibleProjects: {
    myProjects: [],
    joinedProjects: [],
  },
  error: null,
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_MY_PROJECTS:
    case GET_MY_PROJECTS_SUCCESS:
    case GET_MY_PROJECTS_ERROR: {
      const newState = getProjectsByProjectType(state, action, PROJECT_TYPES.MY_PROJECTS);
      return  handleAsyncUpdateStateActionsWithNormalize(GET_MY_PROJECTS, true)(newState, action);
    }
    case GET_JOINED_PROJECTS:
    case GET_JOINED_PROJECTS_SUCCESS:
    case GET_JOINED_PROJECTS_ERROR: {
      const newState = getProjectsByProjectType(state, action, PROJECT_TYPES.JOINED_PROJECTS);
      return handleAsyncUpdateStateActionsWithNormalize(GET_JOINED_PROJECTS, true)(newState, action);
    }
    case ADD_MY_PROJECT:
    case ADD_MY_PROJECT_SUCCESS:
    case ADD_MY_PROJECT_ERROR: {
      return handleAsyncUpdateStateActionsWithNormalize(ADD_MY_PROJECT, true)(state, action);
    }
    case DELETE_PROJECT:
    case DELETE_PROJECT_SUCCESS:
    case DELETE_PROJECT_ERROR: {
      const newState = deleteProjectByProjectId(state, action);
      return handleAsyncRemoveStateActionsWithNormalize(DELETE_PROJECT, true)(newState, action);
    }
    default:
      return state;
  }
}
