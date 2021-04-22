import { useCallback, useEffect, useRef, useState } from "react";

import { RECORD_STATE_TYPE } from "../constants/recordState";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function useInterviewRecord({
  socket,
  recordBtnElementRef,
  isInterviewee,
  userId,
}) {
  const [recogText, setRecogText] = useState([]);

  const recordsGlobalsRef = useRef({
    recogText,
    questionText: "",
    isRecording: false,
    recognition: null,
    isInterviewee,
    userId,
  });

  const [recordStateType, setRecordStateType] = useState(
    RECORD_STATE_TYPE.INTERVIEW_BEFORE
  );

  const startRecognitionRecord = useCallback(() => {
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported 😢 (Use Chrome Browser)");
      return;
    }

    if (recordsGlobalsRef.current.isRecording) {
      return;
    }

    console.log("recognition start");

    const recognition = new SpeechRecognition();

    recognition.lang = "ko";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setRecogText([]);
    };

    recognition.onresult = (event) => {
      const transcript = [...event.results].reduce(
        (acc, result) => acc + result[0].transcript,
        ""
      );

      setRecogText(recogText.concat(transcript));
    };

    recognition.start();

    recordsGlobalsRef.current.recognition = recognition;
    recordsGlobalsRef.current.isRecording = true;
  }, []);

  const stopRecognitionRecord = useCallback(() => {
    recordsGlobalsRef.current.isRecording = false;
    recordsGlobalsRef.current.recognition &&
      recordsGlobalsRef.current.recognition.stop();
    recordsGlobalsRef.current.recognition = null;
  }, []);

  const setNextRecordStateType = useCallback(() => {
    switch (recordStateType) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        socket.emit("startInterview");
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTIONING);
        startRecognitionRecord();
        socket.emit("question", { userId: recordsGlobalsRef.current.userId });
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordStateType(RECORD_STATE_TYPE.ANSWER_BEFORE);
        stopRecognitionRecord();
        recordsGlobalsRef.current.questionText = recordsGlobalsRef.current.recogText.join(
          " "
        );
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
  }, [recordStateType, socket, startRecognitionRecord, stopRecognitionRecord]);

  useEffect(() => {
    console.log("set Socket Event");

    socket.on("startInterview", () => {
      if (!recordsGlobalsRef.current.isInterviewee) {
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
      }
      console.log("timer start");
    });

    socket.on("preventButton", () => {
      recordBtnElementRef.current.disabled = true;
    });

    socket.on("intervieweeStartAnswer", () => {
      console.log("haha");
      if (recordsGlobalsRef.current.isInterviewee) {
        console.log("intervieweeStartAnswer, start Record");
        startRecognitionRecord();
      }
    });

    socket.on("intervieweeEndAnswer", () => {
      if (recordsGlobalsRef.current.isInterviewee) {
        console.log("intervieweeEndAnswer, stop Record");
        stopRecognitionRecord();
        console.log("send Anser", recordsGlobalsRef.current.recogText);
        socket.emit("sendAnswer", {
          answer: recordsGlobalsRef.current.recogText,
        });
      }
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === recordsGlobalsRef.current.userId) {
        console.log("questioner receive Answer uploading...");
        console.log("question", recordsGlobalsRef.current.questionText);
        console.log("answer", answer.join(" "));
        console.log("uploading work...");

        setTimeout(() => {
          socket.emit("uploadComplete");
        }, 1500);
      }
    });

    socket.on("enableButton", () => {
      recordBtnElementRef.current.disabled = false;
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });
  }, [recordBtnElementRef, socket, startRecognitionRecord, stopRecognitionRecord]);

  useEffect(() => {
    recordsGlobalsRef.current.recogText = recogText;
  }, [recogText]);

  useEffect(() => {
    recordsGlobalsRef.current.isInterviewee = isInterviewee;
  }, [isInterviewee]);

  useEffect(() => {
    recordsGlobalsRef.current.userId = userId;
  }, [userId]);

  return { recordStateType, recogText, setNextRecordStateType };
}
