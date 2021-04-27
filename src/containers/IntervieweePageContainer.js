import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import useInterviewRecord from "../hooks/useInterviewRecord";
import useTimer from "../hooks/useTimer";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import { getJoinedProjects, getProjectById } from "../redux/reducers/projects";
import { mediaOptions, mediaStream } from "../utils/media";
import genUuid from "../utils/uuid";

export default function InterviewPageContainer() {
  const socket = useMemo(() => io.connect(process.env.REACT_APP_SERVER_PORT), []);
  const dispatch = useDispatch();

  const { userData } = useSelector(({ user }) => ({ userData: user.userData }));
  const { project } = useSelector(({ projects }) => ({
    project: getProjectById(projects, "60847ae7bb423ea878bc54b9"),
  }));

  const { intervieweeId } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const userVideo = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const peersRef = useRef([]);
  const [questionModalFlag, setQuestionModalFlag] = useState(false);
  const [totalResultModalFlag, setTotalResultModalFlag] = useState(false);
  const { time, setIsActive } = useTimer();
  const { token } = useToken();

  //////////////////////////하영작업///////////////////////
  const {
    recordStateType,
    recogText,
    isDisabled,
  } = useInterviewRecord({
    socket,
    userId: genUuid(),
    isInterviewee: userData.isInterviewee,
    setTimerActive: setIsActive,
  });
  //////////////////////////////////////////////////////

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
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    socket.emit("requestJoinRoom", { roomID: intervieweeId, userData: { ...userData, isInterviewee: userData.isInterviewee } });

    socket.on("joinSuccess", (targetUsers) => {
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", { callee: user.socketID, caller: socket.id, signal });
        });


        setPeers((prev) => [...prev, { peer, peerID: user.socketID }]);

        peersRef.current.push({
          peerID: user.socketID,
          peer,
        });
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

      setPeers((prev) => [...prev, { peer, peerID: caller }]);

      peersRef.current.push({
        peerID: caller,
        peer,
      });
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((p) => p.peerID === id);

      peer.signal(signal);
    });

    socket.on("successToLeaveOtherUser", ({ id }) => {
      const [currentPeer] = peersRef.current.filter((peer) => peer.peerID === id);
      
      currentPeer?.peer.destroy();

      const filteredPeers = peersRef.current.filter((peer) => peer.peerID !== id);
      
      peersRef.current = filteredPeers;
      setPeers(filteredPeers);
    });

    return () => {
      if (isStreaming) {
        socket.disconnect();
      }
    };
  }, [isStreaming]);

  function handleBackBtn() {
    setTotalResultModalFlag(true);
  }

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

  return (
    <>
      <Interview
        time={time}
        isQuestionModalOn={questionModalFlag}
        isTotalResultModalOn={totalResultModalFlag}
        project={project}
        user={userVideo}
        recogText={recogText}
        userData={userData}
        interviewers={peers}
        isButtonDisabled={isDisabled}
        recordStateType={recordStateType}
        isInterviewee={userData.isInterviewee}
        onVideoBtnClick={handleVideo}
        onAudioBtnClick={handleAudio}
        onBackButtonClick={handleBackBtn}
      />
    </>
  );
}
