import { takeLatest, takeLeading } from "redux-saga/effects";

import { 
  addMyProjectAPI, 
  closeNewInterviewRoom, 
  deleteProjectAPI, 
  getJoinedProjectsAPI, 
  getMyProjectsAPI, 
  openNewInterviewRoom, 
} from "../../api";
import { PROJECT_TYPES } from "../../constants/projects";
import { changeDateFormat } from "../../utils/date";
import {
  addProjectsByProjectId,
  deleteProjectByProjectId,
  getProjectsByProjectType,
  handleAsyncRemoveStateActionsWithNormalize,
  handleAsyncUpdateStateActionsWithNormalize,
} from "../lib/reducerUtils";
import { createPromiseSaga } from "../lib/sagaUtils";

const BASE_PATH = "PROJECT/";

const GET_MY_PROJECTS = BASE_PATH + "GET_MY_PROJECTS";
const GET_MY_PROJECTS_SUCCESS = BASE_PATH + "GET_MY_PROJECTS_SUCCESS";
const GET_MY_PROJECTS_ERROR = BASE_PATH + "GET_MY_PROJECTS_ERROR";

const GET_JOINED_PROJECTS = BASE_PATH + "GET_JOINED_PROJECTS";
const GET_JOINED_PROJECTS_SUCCESS = BASE_PATH + "GET_JOINED_PROJECTS_SUCCESS";
const GET_JOINED_PROJECTS_ERROR = BASE_PATH + "GET_JOINED_PROJECTS_ERROR";

const ADD_MY_PROJECT = "ADD_MY_PROJECTS";
export const ADD_MY_PROJECT_SUCCESS = "ADD_MY_PROJECTS_SUCCESS";
const ADD_MY_PROJECT_ERROR = "ADD_MY_PROJECTS_ERROR";

const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR";

// interview룸 오픈 -> project isopened로 바뀌어야..
const OPEN_INTERVIEW_ROOM = BASE_PATH + "OPEN_INTERVIEW_ROOM";
const OPEN_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "OPEN_INTERVIEW_ROOM_SUCCESS";
const OPEN_INTERVIEW_ROOM_ERROR = BASE_PATH + "OPEN_INTERVIEW_ROOM_ERROR";

// interview룸 닫기 -> project id를 통해 isopened false
const CLOSE_INTERVIEW_ROOM = BASE_PATH + "CLOSE_INTERVIEW_ROOM";
const CLOSE_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "CLOSE_INTERVIEW_ROOM_SUCCESS";
const CLOSE_INTERVIEW_ROOM_ERROR = BASE_PATH + "CLOSE_INTERVIEW_ROOM_ERROR";

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

export const addMyProject = ({ userId, newProject, token }) => ({
  type: ADD_MY_PROJECT,
  payload: { userId, newProject, token },
  meta: { userId, newProject },
});

export const deleteProject = ({ projectId, token }) => ({
  type: DELETE_PROJECT,
  payload: { projectId, token },
  meta: projectId,
});

export const openInterviewRoom = ({ projectId, token }) => ({ 
  type: OPEN_INTERVIEW_ROOM, 
  payload: { projectId, token }, 
  meta: projectId,
});

export const closeInterviewRoom = ({ projectId, token }) => ({ 
  type: CLOSE_INTERVIEW_ROOM, 
  payload: { token, projectId }, 
  meta: projectId, 
});

const getMyProjectsSaga = createPromiseSaga(GET_MY_PROJECTS, getMyProjectsAPI);
const getJoinedProjectsSaga = createPromiseSaga(GET_JOINED_PROJECTS, getJoinedProjectsAPI);
const addMyProjectSaga = createPromiseSaga(ADD_MY_PROJECT, addMyProjectAPI);
const deleteProjectSaga = createPromiseSaga(DELETE_PROJECT, deleteProjectAPI);
const openInterviewRoomSaga = createPromiseSaga(OPEN_INTERVIEW_ROOM, openNewInterviewRoom);
const closeInterviewRoomSaga = createPromiseSaga(CLOSE_INTERVIEW_ROOM, closeNewInterviewRoom);


export function* projectsSaga() {
  yield takeLeading(GET_MY_PROJECTS, getMyProjectsSaga);
  yield takeLeading(GET_JOINED_PROJECTS, getJoinedProjectsSaga);
  yield takeLatest(ADD_MY_PROJECT, addMyProjectSaga);
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
  yield takeLatest(OPEN_INTERVIEW_ROOM, openInterviewRoomSaga);
  yield takeLatest(CLOSE_INTERVIEW_ROOM, closeInterviewRoomSaga);
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

      return handleAsyncUpdateStateActionsWithNormalize(GET_MY_PROJECTS, true)(newState, action);
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
      const newState = addProjectsByProjectId(state, action, PROJECT_TYPES.MY_PROJECTS);
      return handleAsyncUpdateStateActionsWithNormalize(ADD_MY_PROJECT, true)(newState, action);
    }
    case DELETE_PROJECT:
    case DELETE_PROJECT_SUCCESS:
    case DELETE_PROJECT_ERROR: {
      const newState = deleteProjectByProjectId(state, action);
      
      return handleAsyncRemoveStateActionsWithNormalize(DELETE_PROJECT, true)(newState, action);
    }
    case OPEN_INTERVIEW_ROOM:
    case OPEN_INTERVIEW_ROOM_SUCCESS:
    case OPEN_INTERVIEW_ROOM_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(OPEN_INTERVIEW_ROOM, true)(state, action);
    case CLOSE_INTERVIEW_ROOM:
    case CLOSE_INTERVIEW_ROOM_SUCCESS:
    case CLOSE_INTERVIEW_ROOM_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(CLOSE_INTERVIEW_ROOM, true)(state, action);
    default:
      return state;
  }
}

export function projectIdsToByIdObjs(ids, projectByIds) {
  return ids.map(projectId => {
    const { id, title, candidateNum, createAt } = projectByIds[projectId];
    const formattedDate = changeDateFormat(createAt, "yyyy-MM-dd");

    return {
      id,
      title,
      candidateNum,
      createAt: formattedDate,
    };
  });
}
