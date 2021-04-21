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

  const recogTextRef = useRef(recogText);
  const isRecordingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isIntervieweeRef = useRef(false);
  const recordBtnElement = useRef();
  const userIdRef = useRef(null);

  const [recordBtnState, setRecordBtnState] = useState(
    RECORD_STATE_TYPE.INTERVIEW_BEFORE
  );

  const startRecognitionRecord = useCallback(() => {
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported 😢 (Use Chrome Browser)");
      return;
    }

    if (isRecordingRef.current) {
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

    recognitionRef.current = recognition;
    isRecordingRef.current = true;
  }, []);

  const stopRecognitionRecord = useCallback(() => {
    isRecordingRef.current = false;
    recognitionRef.current && recognitionRef.current.stop();
    recognitionRef.current = null;
  }, []);

  const setNextRecordBtnState = useCallback(() => {
    switch (recordBtnState) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTIONING);
        startRecognitionRecord();
        socket.emit("question", { userId: userIdRef.current });
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
  }, [recordBtnState, socket, startRecognitionRecord, stopRecognitionRecord, userIdRef]);

  useEffect(() => {
    console.log("set Socket Event");

    socket.on("preventButton", () => {
      recordBtnElement.current.disabled = true;
    });

    socket.on("intervieweeStartAnswer", () => {
      if (isIntervieweeRef.current) {
        console.log("intervieweeStartAnswer, start Record");
        startRecognitionRecord();
      }
    });

    socket.on("intervieweeEndAnswer", () => {
      if (isIntervieweeRef.current) {
        console.log("intervieweeEndAnswer, stop Record");
        stopRecognitionRecord();
        console.log("send Anser", recogTextRef.current);
        socket.emit("sendAnswer", { answer: recogTextRef.current });
      }
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === userIdRef.current) {
        console.log("questioner receive Answer", answer);
      }
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });
  }, [socket, startRecognitionRecord, stopRecognitionRecord]);

  useEffect(() => {
    recogTextRef.current = recogText;
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
    userIdRef.current = uuid;
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
    isIntervieweeRef.current = true;
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
      {!isIntervieweeRef.current && (
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
