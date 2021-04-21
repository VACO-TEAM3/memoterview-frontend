import React, { useCallback, useEffect, useRef, useState } from "react";

import { BUTTON_NAME, RECORD_STATE_TYPE } from "../../constants/recordState";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceToTextTestPage() {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const isRecordingRef = useRef(false);
  const recognitionRef = useRef(null);
  const [recordBtnState, setRecordBtnState] = useState(RECORD_STATE_TYPE.INTERVIEW_BEFORE);

  const setNextRecordBtnState = useCallback(() => {
    switch (recordBtnState) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.QUESTIONING);
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordBtnState(RECORD_STATE_TYPE.ANSWER_BEFORE);
        break;
      case RECORD_STATE_TYPE.ANSWER_BEFORE:
        setRecordBtnState(RECORD_STATE_TYPE.ANSWERING);
        break;
      case RECORD_STATE_TYPE.ANSWERING:
        setRecordBtnState(RECORD_STATE_TYPE.SAVING);
        break;
      // case RECORD_STATE_TYPE.SAVING:
      //   setRecordBtnState(RECORD_STATE_TYPE.QUESTION_BEFORE);
      //   break;
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

    if (recordBtnState === RECORD_STATE_TYPE.QUESTIONING || recordBtnState === RECORD_STATE_TYPE.ANSWERING) {
      if (isRecordingRef.current) {
        return;
      }

      console.log("rerendering");

      const recognition = new SpeechRecognition();

      recognition.lang = "ko";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log(`Voice recognition started. Record State ${recordBtnState}`);
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
      console.log("recog stop!!!");
      isRecordingRef.current = false;
      recognitionRef.current && recognitionRef.current.stop();
      recognitionRef.current = null;
      console.log(`else Record State ${recordBtnState}`);
    }
  }, [answer, question, recordBtnState]);

  return (
    <div>
      <button id="button" onClick={handleClickRecord}>
        {BUTTON_NAME[recordBtnState]}
      </button>
      {/* <button id="button" onClick={onClickGoogleButton}>
        {record ? "구글 음성인식 종료" : "구글 음성인식 시작"}
      </button> */}

      <h1>질문 : {question.join(" ")}</h1>
      <h2>답변 : {answer.join(" ")}</h2>
    </div>
  );
}
