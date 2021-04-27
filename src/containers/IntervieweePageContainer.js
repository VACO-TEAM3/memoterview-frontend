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

  const { intervieweeId, projectId } = useParams();

  const { userData } = useSelector(({ user }) => ({ userData: user.userData }));
  const { project } = useSelector(({ projects }) => ({
    project: getProjectById(projects, projectId),
  }));
  
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
    
    socket.emit("requestJoinRoom", {
      roomID: intervieweeId,
      userData,
    });
    
    socket.on("joinSuccess", (targetUsers) => { // 가입 성공
      console.log(userData.username);
      console.log(targetUsers);
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true, // create offer
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", { // caller정보
            isInterviewee: userData.isInterviewee,
            callee: user.socketID,
            caller: socket.id,
            signal,
            name: userData.username,
          });
        });
        console.log(user.username);
        console.log(userData.username);
        setPeers((prev) => [ // callee 정보들; (타인의 정보들)
          ...prev,
          {
            peer,
            peerID: user.socketID,
            name: user.username,
            isInterviewee: user.isInterviewee,
          }
        ]);

        peersRef.current.push({
          peerID: user.socketID,
          peer,
          name: user.username,
          isInterviewee: user.isInterviewee,
        });
      });
    });
    
    socket.on("joinNewUser", ({ signal, caller, isInterviewee, name }) => { // callee 정보들
      console.log("나는 찍히면 안돼");
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returnSignal", { signal, caller });
      });
      
      peer.signal(signal);
      
      setPeers((prev) => [...prev, { peer, peerID: caller, name, isInterviewee }]);
      console.log(name);
      peersRef.current.push({
        peerID: caller,
        peer,
        name,
        isInterviewee,
      });
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((peer) => peer.peerID === id);

      peer.signal(signal);
    });

    socket.on("successToLeaveOtherUser", ({ id }) => {
      const [currentPeer] = peersRef.current.filter((peer) => peer.peerID === id);
      currentPeer?.peer.destroy();

      const filteredPeers = peersRef.current.filter((peer) => peer.peerID !== id); // 로직 바꾸기
      peersRef.current = filteredPeers;

      setPeers(filteredPeers);
    });

    return () => {
      if (isStreaming) {
        console.log(24);
        socket.disconnect({ interviewDuration: time });
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
