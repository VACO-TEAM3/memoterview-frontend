import { faHourglassHalf, faPlay, faQuestion, faRecordVinyl, faVoicemail } from "@fortawesome/free-solid-svg-icons";

export const RECORD_STATE_TYPE = {
  INTERVIEW_BEFORE: 0,
  QUESTION_BEFORE: 1,
  QUESTIONING: 2,
  ANSWER_BEFORE: 3,
  ANSWERING: 4,
  SAVING: 5,
};

export const BUTTON_NAME = {
  [RECORD_STATE_TYPE.INTERVIEW_BEFORE]: {
    state: "START",
    message: "버튼을 눌러 면접을 시작하세요",
    icon: faPlay,
    color: {
      normalColor: "#2181B1",
      hoverColor: "#056A9B",
    },
  },
  [RECORD_STATE_TYPE.QUESTION_BEFORE]: {
    state: "QUESTION",
    message: "질문을 녹음하세요",
    icon: faQuestion,
    color: {
      normalColor: "#1F8049",
      hoverColor: "#186639",
    },
  },
  [RECORD_STATE_TYPE.QUESTIONING]: {
    state: "RECORD",
    message: "버튼을 누를 시 녹음이 중단됩니다",
    icon: faRecordVinyl,
    color: {
      normalColor: "#CF3F28",
      hoverColor: "#A22F1D",
    },
  },
  [RECORD_STATE_TYPE.ANSWER_BEFORE]: {
    state: "ANSWER",
    message: "답변을 녹음하세요",
    icon: faVoicemail,
    color: {
      normalColor: "#1F8049",
      hoverColor: "#186639",
    },
  },
  [RECORD_STATE_TYPE.ANSWERING]: {
    state: "RECORD",
    message: "버튼을 누를 시 녹음이 중단됩니다",
    icon: faRecordVinyl,
    color: {
      normalColor: "#CF3F28",
      hoverColor: "#A22F1D",
    },
  },
  [RECORD_STATE_TYPE.SAVING]: {
    state: "SAVING...",
    message: "저장 중 입니다",
    icon: faHourglassHalf,
    color: {
      normalColor: "#2181B1",
      hoverColor: "#056A9B",
    },
  },
};
