import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { createIntervieweeAPI, deleteIntervieweeAPI, getIntervieweesApi, updateInterviewee } from "../../api";
import { handleAsyncRemoveStateActionsWithNormalize, handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
import { createPromiseSaga, createPromiseSagaById } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

// interviewee들 가져오기.. project로 populate
export const GET_INTERVIEWEES = BASE_PATH + "GET_INTERVIEWEES";
export const GET_INTERVIEWEES_SUCCESS = BASE_PATH + "GET_INTERVIEWEES_SUCCESS";
export const GET_INTERVIEWEES_ERROR = BASE_PATH + "GET_INTERVIEWEES_ERROR";

// interviewee 추가 ->
export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
export const ADD_NEW_INTERVIEWEE_ERROR = BASE_PATH + "ADD_NEW_INTERVIEWEE_ERROR";

// interview 끝내기 -> interviewee 정보 저장 + interviewed true
export const FINISH_INTERVIEW = BASE_PATH + "FINISH_INTERVIEW";
export const FINISH_INTERVIEW_SUCCESS = BASE_PATH + "FINISH_INTERVIEW_SUCCESS";
export const FINISH_INTERVIEW_ERROR = BASE_PATH + "FINISH_INTERVIEW_ERROR";

// interviewee 삭제 ->
export const DELETE_INTERVIEWEE = BASE_PATH + "DELETE_INTERVIEWEES";
export const DELETE_INTERVIEWEE_SUCCESS = BASE_PATH + "DELETE_INTERVIEWEES_SUCCESS";
export const DELETE_INTERVIEWEE_ERROR = BASE_PATH + "DELETE_INTERVIEWEES_ERROR";


export const getInterviewees = ({ projectId, token }) => ({
  type: GET_INTERVIEWEES,
  payload: { projectId, token },
  meta: projectId,
});

export const addNewInterviewee = ({ token, intervieweeInfo, pdf, projectId }) => ({
  type: ADD_NEW_INTERVIEWEE,
  payload: { token, intervieweeInfo, pdf, projectId },
  meta: projectId,
});

export const finishInterview = ({
  token,
  interviewee,
  projectId,
  intervieweeId,
}) => ({
  type: FINISH_INTERVIEW,
  payload: { token, interviewee, projectId, intervieweeId },
  meta: interviewee,
});

export const deleteInterviewee = ({ token, projectId, intervieweeId }) => ({
  type: DELETE_INTERVIEWEE,
  payload: { token, projectId, intervieweeId },
  meta: intervieweeId,
});

export const getIntervieweesSaga = createPromiseSaga(GET_INTERVIEWEES, getIntervieweesApi);
export const addNewIntervieweeSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE, createIntervieweeAPI);
export const finishInterviewSaga = createPromiseSaga(FINISH_INTERVIEW, updateInterviewee);
export const deleteIntervieweeSaga = createPromiseSaga(DELETE_INTERVIEWEE, deleteIntervieweeAPI);

export function* intervieweeSaga() {
  yield takeLeading(GET_INTERVIEWEES, getIntervieweesSaga);
  yield takeLatest(ADD_NEW_INTERVIEWEE, addNewIntervieweeSaga);
  yield takeLatest(FINISH_INTERVIEW, finishInterviewSaga);
  yield takeLatest(DELETE_INTERVIEWEE, deleteIntervieweeSaga);
}

const commentInitialState = {
  comment: "",
  score: 0,
  commentor: "",
};

const questionInitialState = {
  quistion: "",
  answer: "",
  score: 0,
  questioner: "",
};

const intervieweesInitialState = {
  id: "",
  name: "",
  email: "",
  interviewDate: "",
  resumePath: "",
  filterScore: [], // 백엔드 스키마 수정해야함
  isInterviewed: false,
  questioner: questionInitialState,
  comments: commentInitialState,
};

const initialState = {
  loading: false,
  byId: {},
  allIds: [],
  error: null,
};

export default function interviewees(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_INTERVIEWEE:
    case ADD_NEW_INTERVIEWEE_SUCCESS:
    case ADD_NEW_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(ADD_NEW_INTERVIEWEE, true)(state, action);
    case GET_INTERVIEWEES:
    case GET_INTERVIEWEES_SUCCESS:
    case GET_INTERVIEWEES_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(GET_INTERVIEWEES, true)(state, action);
    case FINISH_INTERVIEW:
    case FINISH_INTERVIEW_SUCCESS:
    case FINISH_INTERVIEW_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(FINISH_INTERVIEW, true)(state, action);
    case DELETE_INTERVIEWEE:
    case DELETE_INTERVIEWEE_SUCCESS:
    case DELETE_INTERVIEWEE_ERROR:
      return handleAsyncRemoveStateActionsWithNormalize(DELETE_INTERVIEWEE, true)(state, action);
    default:
      return state;
  }
}

export function intervieweeIdsToByIdObjs(ids, intervieweeByIds) {
  return ids.map((intervieweeId) => intervieweeByIds[intervieweeId]);
}

export function extractIntervieweesByInterviewed(interviewees) {
  const waitingInterviewees = [];
  const resultInterviewees = [];

  for (const interviewee of interviewees) {
    if (interviewee.isInterviewed) {
      resultInterviewees.push(interviewee);
      continue;
    }

    waitingInterviewees.push(interviewee);
  }

  return { waitingInterviewees, resultInterviewees };
}
