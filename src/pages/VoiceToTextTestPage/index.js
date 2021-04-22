import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

import { BUTTON_NAME } from "../../constants/recordState";
import useInterviewRecord from "../../hooks/useInterviewRecord";

export default function VoiceToTextTestPage() {
  const socket = useMemo(() => io.connect("http://localhost:5000"), []);
  const recordBtnElementRef = useRef();

  const [isInterviewee, setIsInterviewee] = useState(false);
  const [userId, setUserId] = useState("");

  const {
    recordStateType,
    recogText,
    setNextRecordStateType,
  } = useInterviewRecord({
    socket,
    recordBtnElementRef,
    userId,
    isInterviewee,
  });

  function handleClickRecord() {
    setNextRecordStateType();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        setNextRecordStateType();
      }
    },
    [setNextRecordStateType]
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
        <button
          id="button"
          onClick={handleClickRecord}
          ref={recordBtnElementRef}
        >
          {BUTTON_NAME[recordStateType]}
        </button>
      )}
      <h1>녹음 텍스트 : {recogText}</h1>
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
