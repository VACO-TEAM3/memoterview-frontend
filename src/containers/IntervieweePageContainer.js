import { truncate } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import { updateIntervieweeAnswer } from "../api";
import { RECORD_STATE_TYPE } from "../constants/recordState";
import useInterviewRecord from "../hooks/useInterviewRecord";
import useTimer from "../hooks/useTimer";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import { finishInterview } from "../redux/reducers/interviewees";
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

  const { intervieweeId, projectId } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const [filterRates, setFilterRates] = useState({});
  const [questionRate, setQuestionRate] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [comment, setComment] = useState("");
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [questionModalFlag, setQuestionModalFlag] = useState(false);
  const [totalResultModalFlag, setTotalResultModalFlag] = useState(false);
  const { time, setIsActive } = useTimer();
  const { token } = useToken();
  const history = useHistory();

  //////////////////////////하영작업///////////////////////
  const {
    recordStateType,
    recogText,
    setNextRecordStateType,
    answer,
    question,
    uploadComplete,
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
    
    dispatch(getJoinedProjects({ token, userId: "607d993601d20ebeb15e257b" }));
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    // todo. userData -> isInterviewee 정보 포함한 userData로 받게
    socket.emit("requestJoinRoom", { roomID: intervieweeId, userData: { ...userData } });

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
      
      currentPeer.peer.destroy();

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

  function closeTotalResultModal() {
    setTotalResultModalFlag(false);
  }

  function closeQuestionModal() {
    setQuestionModalFlag(false);
  }

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

  function handleProcessBtnClick() {
    if (RECORD_STATE_TYPE.ANSWERING === recordStateType) {
      setQuestionModalFlag(true);
    }
    
    setNextRecordStateType();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (!isDisabled) {
        if (event.key === " " || event.key === "Spacebar") {
          setNextRecordStateType();
        }
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

  function handleFilterRate(rateOption, value) {
    setFilterRates((prev) => ({ ...prev, [rateOption]: value }));
  }

  function handleTotalRate(_, value) {
    setTotalRate(value);
  }

  function handleQuestionRate(_, value) {
    setQuestionRate(value);
  }

  function handleCommentChange({ target: { value } }) {
    setComment(value);
  }

  function handleResultSubmit(event) {
    event.preventDefault();

    dispatch(finishInterview({ 
      token, 
      projectId, 
      intervieweeId, 
      interviewee: {
        filterScores: { ...filterRates },
        comments: {
          comment,
          score: totalRate,
          commentor: userData.id,
        },
      },
    }));
    
    history.push(`/projects/${projectId}`); // 결과 페이지로 바꿔야함
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault();

    await updateIntervieweeAnswer({
      projectId,
      intervieweeId,
      token,
      question: {
        title: question,
        answer,
        score: Number(questionRate),
        interviewer: userData.id,
      },
    });

    uploadComplete();
    setQuestionModalFlag(false);
  }

  return (
    <>
      <Interview
        time={time}
        isQuestionModalOn={questionModalFlag}
        isTotalResultModalOn={totalResultModalFlag}
        onTotalResultModalClose={closeTotalResultModal}
        project={project}
        user={userVideo}
        userData={userData}
        interviewers={peers}
        isButtonDisabled={isDisabled}
        recordStateType={recordStateType}
        recogText={recogText}
        isInterviewee={userData.isInterviewee}
        onVideoBtnClick={handleVideo}
        onAudioBtnClick={handleAudio}
        onProcessBtnClick={handleProcessBtnClick}
        onTotalRateChange={handleTotalRate}
        onFilterRateChange={handleFilterRate}
        onQuestionRateChange={handleQuestionRate}
        onCommentChange={handleCommentChange}
        onResultSubmit={handleResultSubmit}
        onBackButtonClick={handleBackBtn}
        onQuestionModalClose={closeQuestionModal}
        onQuestionSubmit={handleQuestionSubmit}
      />
    </>
  );
}
