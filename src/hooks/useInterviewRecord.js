import { useCallback, useEffect, useRef, useState } from "react";

import { RECORD_STATE_TYPE } from "../constants/recordState";
import useSpeechRecognition from "./useSpeechRecognition";

export default function useInterviewRecord({
  socket,
  recordBtnElementRef,
  isInterviewee,
  userId,
}) {
  const { recogText, startRecognition, stopRecognition } = useSpeechRecognition();

  const recordsGlobalsRef = useRef({
    recogText,
    questionText: "",
    isInterviewee,
    userId,
  });
  const [answer, setAnswer] = useState("");
  const [recordStateType, setRecordStateType] = useState(
    RECORD_STATE_TYPE.INTERVIEW_BEFORE
  );

  const setNextRecordStateType = useCallback(() => {
    switch (recordStateType) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        socket.emit("startInterview");
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTIONING);
        startRecognition();
        socket.emit("question", { userId: recordsGlobalsRef.current.userId });
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordStateType(RECORD_STATE_TYPE.ANSWER_BEFORE);
        stopRecognition();
        recordsGlobalsRef.current.questionText = recordsGlobalsRef.current.recogText;
        break;
      case RECORD_STATE_TYPE.ANSWER_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.ANSWERING);
        socket.emit("requestAnswer");
        break;
      case RECORD_STATE_TYPE.ANSWERING:
        setRecordStateType(RECORD_STATE_TYPE.SAVING);
        socket.emit("endAnswer");
        break;
      case RECORD_STATE_TYPE.SAVING:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      default:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
    }
  }, [recordStateType, socket, startRecognition, stopRecognition]);

  function uploadComplete() {
    socket.emit("uploadComplete");
  }

  useEffect(() => {
    socket.on("startInterview", () => {
      if (!recordsGlobalsRef.current.isInterviewee) {
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
      }
    });

    socket.on("preventButton", () => {
      recordBtnElementRef.current.disabled = true;
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === recordsGlobalsRef.current.userId) {

        setAnswer(answer);
      }
    });

    socket.on("enableButton", () => {
      recordBtnElementRef.current.disabled = false;
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });
  }, [recordBtnElementRef, socket, stopRecognition]);

  useEffect(() => {
    function handleIntervieweeStartAnswerOccur() {
      if (recordsGlobalsRef.current.isInterviewee) {
        startRecognition();
      }
    }

    socket.on("intervieweeStartAnswer", handleIntervieweeStartAnswerOccur);

    return () => {
      socket.off("intervieweeStartAnswer", handleIntervieweeStartAnswerOccur);
    };
  }, [socket, startRecognition]);

  useEffect(() => {
    function handleIntervieweeEndAnswerOccur() {
      if (recordsGlobalsRef.current.isInterviewee) {
        stopRecognition();
        socket.emit("sendAnswer", {
          answer: recogText,
        });
      }
    }

    socket.on("intervieweeEndAnswer", handleIntervieweeEndAnswerOccur);

    return () => {
      socket.off("intervieweeEndAnswer", handleIntervieweeEndAnswerOccur);
    };
  }, [recogText, socket, stopRecognition]);

  useEffect(() => {
    recordsGlobalsRef.current.recogText = recogText;
  }, [recogText]);

  useEffect(() => {
    recordsGlobalsRef.current.isInterviewee = isInterviewee;
  }, [isInterviewee]);

  return { recordStateType, recogText, setNextRecordStateType, uploadComplete, answer, question: recordsGlobalsRef.current.questionText };
}
