import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { addNewIntervieweeAPI } from "../lib/mockApi";
<<<<<<< HEAD
import { handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
=======
>>>>>>> 5eeecc3... [ADD] interviewee redux init
import { createPromiseSaga } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
<<<<<<< HEAD
export const ADD_NEW_INTERVIEWEE_ERROR = BASE_PATH + "ADD_NEW_INTERVIEWEE_ERROR";

export const OPEN_INTERVIEW_ROOM = BASE_PATH + "OPEN_INTERVIEW_ROOM";
export const OPEN_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "OPEN_INTERVIEW_ROOM_SUCCESS";
export const OPEN_INTERVIEW_ROOM_ERROR = BASE_PATH + "OPEN_INTERVIEW_ROOM_ERROR";
=======
export const ADD_NEW_INTERVIEWEE_FAILURE = BASE_PATH + "ADD_NEW_INTERVIEWEE_FAILURE";

export const OPEN_INTERVIEW_ROOM = BASE_PATH + "OPEN_INTERVIEW_ROOM";
export const OPEN_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "OPEN_INTERVIEW_ROOM_SUCCESS";
export const OPEM_INTERVIEW_ROOM_FAILURE = BASE_PATH + "OPEN_INTERVIEW_ROOM_FAILURE";
>>>>>>> 5eeecc3... [ADD] interviewee redux init

export const openInterviewRoom = (interviewee) => ({ type: OPEN_INTERVIEW_ROOM, payload: interviewee, meta: interviewee });
export const addNewInterviewee = (interviewee) => ({ type: ADD_NEW_INTERVIEWEE, payload: interviewee, meta: interviewee });

export const openInterviewRoomSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
export const addNewIntervieweeSaga = createPromiseSaga(OPEN_INTERVIEW_ROOM);

export function* intervieweeSaga() {
  yield takeLeading(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
<<<<<<< HEAD
  yield takeLeading(OPEN_INTERVIEW_ROOM); // api함수 만들어야함
=======
  yield takeLeading(OPEN_INTERVIEW_ROOM);
>>>>>>> 5eeecc3... [ADD] interviewee redux init
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
