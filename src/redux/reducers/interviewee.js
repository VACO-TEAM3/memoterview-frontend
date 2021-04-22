import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { addNewIntervieweeAPI } from "../lib/mockApi";
import { handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
import { createPromiseSaga } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

// interviewee들 가져오기.. project로 populate
export const GET_INTERVIEWEES = BASE_PATH + "GET_INTERVIEWEES";
export const GET_INTERVIEWEES_SUCCESS = BASE_PATH + "GET_INTERVIEWEES_SUCCESS";
export const GET_INTERVIEWEES_ERROR = BASE_PATH + "GET_INTERVIEWEES_ERROR";

// interviewee 추가 ->
export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
export const ADD_NEW_INTERVIEWEE_ERROR = BASE_PATH + "ADD_NEW_INTERVIEWEE_ERROR";

// interview룸 오픈 -> project isopened로 바뀌어야..
export const OPEN_INTERVIEW_ROOM = BASE_PATH + "OPEN_INTERVIEW_ROOM";
export const OPEN_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "OPEN_INTERVIEW_ROOM_SUCCESS";
export const OPEN_INTERVIEW_ROOM_ERROR = BASE_PATH + "OPEN_INTERVIEW_ROOM_ERROR";

// interviewee의 이력서 가져오기
export const GET_RESUME = BASE_PATH + "GET_RESUME";
export const GET_RESUME_SUCCESS = BASE_PATH + "GET_RESUME_SUCCESS";
export const GET_RESUME_ERROR = BASE_PATH + "GET_RESUME_ERROR";

// interview 끝내기 -> interviewee 정보 저장 + interviewed true
export const FINISH_INTERVIEW = BASE_PATH + "FINISH_INTERVIEW";
export const FINISH_INTERVIEW_SUCCESS = BASE_PATH + "FINISH_INTERVIEW_SUCCESS";
export const FINISH_INTERVIEW_ERROR = BASE_PATH + "FINISH_INTERVIEW_ERROR";

// interview룸 닫기 -> project id를 통해 isopend false
export const CLOSE_INTERVIEW_ROOM = BASE_PATH + "CLOSE_INTERVIEW_ROOM";
export const CLOSE_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "CLOSE_INTERVIEW_ROOM_SUCCESS";
export const CLOSE_INTERVIEW_ROOM_ERROR = BASE_PATH + "CLOSE_INTERVIEW_ROOM_ERROR";

export const getInterviewees = ({ projectId, token }) => ({ type: GET_INTERVIEWEES, payload: { projectId, token }, meta: projectId });
export const addNewInterviewee = ({ token, interviewee, projectId }) => ({ type: ADD_NEW_INTERVIEWEE, payload: { token, interviewee, projectId }, meta: interviewee });
export const openInterviewRoom = ({ projectId, token, intervieweeId }) => ({ type: OPEN_INTERVIEW_ROOM, payload: {  projectId, token, intervieweeId }, meta: projectId });
export const getResume = (intervieweeId) => ({ type: GET_RESUME, payload: intervieweeId, meta: intervieweeId });
export const finishInterview = (interviewee) => ({ type: FINISH_INTERVIEW, payload: interviewee, meta: interviewee });
export const closeInterviewRoom = (projectId) => ({ type: GET_RESUME, payload: projectId, meta: projectId });

export const getIntervieweesSaga = createPromiseSaga(GET_INTERVIEWEES);
export const openInterviewRoomSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
export const addNewIntervieweeSaga = createPromiseSaga(OPEN_INTERVIEW_ROOM);
export const getResumeSaga = createPromiseSaga(GET_RESUME);
export const finishInterviewSaga = createPromiseSaga(FINISH_INTERVIEW);
export const closeInterviewRoomSaga = createPromiseSaga(GET_RESUME);

export function* intervieweeSaga() {
  yield takeLeading(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
  yield takeLeading(OPEN_INTERVIEW_ROOM); // api함수 만들어야함
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

const intervieweeInitialState = {
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

export default function projects(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_INTERVIEWEE:
    case ADD_NEW_INTERVIEWEE_SUCCESS:
    case ADD_NEW_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(ADD_NEW_INTERVIEWEE, true)(state, action);
    case OPEN_INTERVIEW_ROOM:
    case OPEN_INTERVIEW_ROOM_SUCCESS:
    case OPEN_INTERVIEW_ROOM_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(OPEN_INTERVIEW_ROOM, true)(state, action);
    default:
      return state;
  }
}
