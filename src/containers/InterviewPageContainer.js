import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import useInterviewRecord from "../hooks/useInterviewRecord";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import { getJoinedProjects } from "../redux/reducers/projects";
import { getProjectById } from "../redux/reducers/projects";
import { mediaOptions, mediaStream } from "../utils/media";
import genUuid from "../utils/uuid";

export default function InterviewPageContainer() {
  const socket = useMemo(() => io.connect(process.env.REACT_APP_SERVER_PORT_LOCAL), []);
  const dispatch = useDispatch();
  const { userData } = useSelector(({ user }) => ({ userData: user.userData }));
  const { project } = useSelector(({ projects }) => ({ 
    project: getProjectById(projects, "6083a2221bc38e7e3f0a4bc7"),
  }));
  const { id: roomID } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const userVideo = useRef();
  const peersRef = useRef([]);
  console.log(userData);
  //////////////////////////하영작업///////////////////////
  const recordBtnElementRef = useRef();
  const isInterviewee = false;
  const {
    recordStateType,
    recogText,
    setNextRecordStateType,
  } = useInterviewRecord({
    socket,
    recordBtnElementRef,
    userId: genUuid(),
    isInterviewee,
  });
  //////////////////////////////////////////////////////
  const { token } = useToken();

  useEffect(() => {
    (async function getStreaming() {
      try {
        const localStream = await mediaStream();

        userVideo.current.srcObject = localStream;

        setStream(localStream);
        setIsStreaming(true);
      } catch (error) {
        setErrorMessage(error);
      }
    })();
    dispatch(getJoinedProjects({ token, userId: "607959226727251880113f56" }));
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    // todo. userData -> isInterviewee 정보 포함한 userData로 받게
    socket.emit("requestJoinRoom", { roomID, userData });

    socket.on("successJoinUser", (targetUsers) => {
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", { callee: user.socketID, caller: socket.id, signal });
        });

        peersRef.current.push({
          peerID: user.socketID,
          peer,
        });

        setPeers((prev) => [...prev, peer]);
      });
    });

    socket.on("joinNewUser", ({ caller, signal }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returnSignal", { signal, caller });
      });

      peer.signal(signal);

      peersRef.current.push({
        peerID: caller,
        peer,
      });

      setPeers((prev) => [...prev, peer]);
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((p) => p.peerID === id);

      peer.signal(signal);
    });
  }, [isStreaming]);

  function handleVideo(state) {
    if (state) {
      mediaOptions.videoOff(stream);
    } else {
      mediaOptions.videoOn(stream);
    }
  }

  function handleAudio(state) {
    if (state) {
      mediaOptions.audioOff(stream);
    } else {
      mediaOptions.audioOn(stream);
    }
  }

  function handleProcessBtnClick() {
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

  return (
    <>
      <Interview
        project={project}
        user={userVideo}
        userData={userData}
        interviewers={peers}
        recordBtnElementRef={recordBtnElementRef}
        recordStateType={recordStateType}
        recogText={recogText}
        isInterviewee={isInterviewee}
        onVideoBtnClick={handleVideo}
        onAudioBtnClick={handleAudio}
        onProcessBtnClick={handleProcessBtnClick}
      />
    </>
  );
}
