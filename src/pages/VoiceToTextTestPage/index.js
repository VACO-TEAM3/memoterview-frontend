import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

import { BUTTON_NAME, RECORD_STATE_TYPE } from "../../constants/recordState";

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceToTextTestPage() {
  const socket = useMemo(() => io.connect("http://localhost:5000"), []);

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [recogText, setRecogText] = useState([]);

  const recordsGlobalsRef = useRef({
    recogText,
    isRecording: false,
    recognition: null,
    isInterviewee: false,
    userId: null,
  });

  const recordBtnElement = useRef();

  const [recordBtnState, setRecordBtnState] = useState(
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
    recordsGlobalsRef.current.recognition && recordsGlobalsRef.current.recognition.stop();
    recordsGlobalsRef.current.recognition = null;
  }, []);

  const setNextRecordBtnState = useCallback(() => {
    switch (recordBtnState) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTIONING);
        startRecognitionRecord();
        socket.emit("question", { userId: recordsGlobalsRef.current.userId });
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordBtnState(RECORD_STATE_TYPE.ANSWER_BEFORE);
        stopRecognitionRecord();
        break;
      case RECORD_STATE_TYPE.ANSWER_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.ANSWERING);
        socket.emit("requestAnswer");
        break;
      case RECORD_STATE_TYPE.ANSWERING:
        setRecordBtnState(RECORD_STATE_TYPE.SAVING);
        socket.emit("endAnswer");
        break;
      case RECORD_STATE_TYPE.SAVING:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      default:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
    }
  }, [recordBtnState, socket, startRecognitionRecord, stopRecognitionRecord]);

  useEffect(() => {
    console.log("set Socket Event");

    socket.on("preventButton", () => {
      recordBtnElement.current.disabled = true;
    });

    socket.on("intervieweeStartAnswer", () => {
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
        socket.emit("sendAnswer", { answer: recordsGlobalsRef.current.recogText });
      }
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === recordsGlobalsRef.current.userId) {
        console.log("questioner receive Answer", answer);
      }
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });
  }, [socket, startRecognitionRecord, stopRecognitionRecord]);

  useEffect(() => {
    recordsGlobalsRef.current.recogText = recogText;
  }, [recogText]);

  function handleClickRecord() {
    setNextRecordBtnState();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        setNextRecordBtnState();
      }
    },
    [setNextRecordBtnState]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  function handleJoinInterviewer() {
    socket.emit("requestJoinRoom", {
      roomID: "test",
      userData: {
        isInterviewee: false,
      },
    });
    const uuid = uuidv4();
    recordsGlobalsRef.current.userId = uuid;
    console.log("join socket as intervewer", uuid);
    alert("인터뷰어로 참가" + uuid);
  }

  function handleJoinInterviewee() {
    socket.emit("requestJoinRoom", {
      roomID: "test",
      userData: {
        isInterviewee: true,
      },
    });
    recordsGlobalsRef.current.isInterviewee = true;
    console.log("join socket as interviewee");
    alert("면접자로 참가");
  }

  return (
    <div>
      <button id="button" onClick={handleJoinInterviewer}>
        인터뷰어로 참가
      </button>
      <button id="button" onClick={handleJoinInterviewee}>
        인터뷰이로 참가
      </button>
      <hr />
      <br />
      {!recordsGlobalsRef.current.isInterviewee && (
        <button id="button" onClick={handleClickRecord} ref={recordBtnElement}>
          {BUTTON_NAME[recordBtnState]}
        </button>
      )}
      <h1>녹음 텍스트 : {recogText.join(" ")}</h1>
    </div>
  );
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
