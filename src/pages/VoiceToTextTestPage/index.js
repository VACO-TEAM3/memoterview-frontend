import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

import { INTERVIEW_STATE } from "../../constants/recordState";
import useInterviewRecord from "../../hooks/useInterviewRecord";
import genUuid from "../../utils/uuid";

export default function VoiceToTextTestPage() {
  const socket = useMemo(() => io.connect(process.env.REACT_APP_INTERVIEW_SOCKET_SERVER_DEVELOPMENT), []);
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
    const uuid = genUuid();
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
          {INTERVIEW_STATE[recordStateType]}
        </button>
      )}
      <h1>녹음 텍스트 : {recogText}</h1>
    </div>
  );
}
