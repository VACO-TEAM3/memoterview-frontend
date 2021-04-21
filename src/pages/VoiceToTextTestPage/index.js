import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

import { BUTTON_NAME, RECORD_STATE_TYPE } from "../../constants/recordState";

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceToTextTestPage() {
  const socket = useMemo(() => io.connect("http://localhost:5000"), []);

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isInterviewee, setIsInterviewee] = useState(false);
  const [userId, setUserId] = useState(null);
  const isRecordingRef = useRef(false);
  const recognitionRef = useRef(null);
  const recordBtnElement = useRef();
  const [recordBtnState, setRecordBtnState] = useState(
    RECORD_STATE_TYPE.INTERVIEW_BEFORE
  );

  const setNextRecordBtnState = useCallback(() => {
    switch (recordBtnState) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTIONING);
        socket.emit("question", { userId });
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordBtnState(RECORD_STATE_TYPE.ANSWER_BEFORE);
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
        socket.emit("sendAnswer", { answer: "test" });
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      default:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
    }
  }, [recordBtnState]);

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

  // Speech Recognition 관련 Side Effect
  useEffect(() => {
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported 😢 (Use Chrome Browser)");
      return;
    }

    if (
      recordBtnState === RECORD_STATE_TYPE.QUESTIONING ||
      recordBtnState === RECORD_STATE_TYPE.ANSWERING
    ) {
      if (isRecordingRef.current) {
        return;
      }

      console.log("rerendering");

      const recognition = new SpeechRecognition();

      recognition.lang = "ko";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log(
          `Voice recognition started. Record State ${recordBtnState}`
        );
      };

      recognition.onresult = (event) => {
        const transcript = [...event.results].reduce(
          (acc, result) => acc + result[0].transcript,
          ""
        );

        switch (recordBtnState) {
          case RECORD_STATE_TYPE.QUESTIONING:
            setQuestion(question.concat(transcript));
            break;
          case RECORD_STATE_TYPE.ANSWERING:
            setAnswer(answer.concat(transcript));
            break;
          default:
            setQuestion(question.concat(transcript));
        }
      };

      recognition.start();

      recognitionRef.current = recognition;
      isRecordingRef.current = true;
    } else {
      isRecordingRef.current = false;
      recognitionRef.current && recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, [answer, question, recordBtnState]);

  function handleJoinInterviewer() {
    socket.emit("requestJoinRoom", {
      roomID: "test",
      userData: {
        isInterviewee: false,
      },
    });
    const uuid = uuidv4();
    setUserId(uuid);
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
    setIsInterviewee(true);
    console.log("join socket as interviewee");
    alert("면접자로 참가");
  }

  useEffect(() => {
    socket.on("preventButton", () => {
      recordBtnElement.current.disabled = true;
    });

    socket.on("intervieweeStartAnswer", () => {
      if (isInterviewee) {
        console.log("intervieweeStartAnswer, start Record");
      }
    });

    socket.on("intervieweeEndAnswer", () => {
      if (isInterviewee) {
        console.log("intervieweeEndAnswer, stop Record");
      }
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === userId) {
        console.log("questioner receive Answer", answer);
      }
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });
  });

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
      {!isInterviewee && (
        <button id="button" onClick={handleClickRecord} ref={recordBtnElement}>
          {BUTTON_NAME[recordBtnState]}
        </button>
      )}
      <h1>질문 : {question.join(" ")}</h1>
      <h2>답변 : {answer.join(" ")}</h2>
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
