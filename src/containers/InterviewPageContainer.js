import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import { updateIntervieweeAnswer } from "../api";
import { RECORD_STATE_TYPE } from "../constants/recordState";
import useInterviewRecord from "../hooks/useInterviewRecord";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import { finishInterview } from "../redux/reducers/interviewee";
import { getJoinedProjects, getProjectById } from "../redux/reducers/projects";
import { mediaOptions, mediaStream } from "../utils/media";
import genUuid from "../utils/uuid";

export default function InterviewPageContainer() {
  const socket = useMemo(() => io.connect(process.env.REACT_APP_SERVER_PORT_LOCAL), []);
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
  //////////////////////////하영작업///////////////////////
  const recordBtnElementRef = useRef();
  const isInterviewee = false;
  const {
    recordStateType,
    recogText,
    setNextRecordStateType,
    answer,
    question,
    uploadComplete,
  } = useInterviewRecord({
    socket,
    recordBtnElementRef,
    userId: genUuid(),
    isInterviewee,
  });
  //////////////////////////////////////////////////////
  const { token } = useToken();
  const history = useHistory();

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
    socket.emit("requestJoinRoom", { roomID: projectId, userData });

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

        setPeers((prev) => [...prev, { peer, peerID: user.socketID }]);
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

      setPeers((prev) => [...prev, { peer, peerID: caller }]);
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((p) => p.peerID === id);

      peer.signal(signal);
    });

    socket.on("successToLeaveOtherUser", ({ id }) => {
      const filteredPeers = peers.filter((peer) => peer.peerID !== id);

      setPeers(filteredPeers);
    });

    return () => {
      socket.disconnect();
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
          commentor: "607959226727251880113f56",
        },
      },
    }));
    
    history.push(`/projects/${projectId}`); // 결과 페이지로 바꿔야함
  }

  function handleQuestionSubmit(event) {
    event.preventDefault();

    updateIntervieweeAnswer({
      intervieweeId: "60851da05b5196ca563c9972",
      token,
      question: {
        title: question,
        answer,
        score: Number(questionRate),
        questioner: "605196ca563c9972",
      },
    });

    uploadComplete();
    setQuestionModalFlag(false);
  }

  return (
    <>
      <Interview
        isQuestionModalOn={questionModalFlag}
        isTotalResultModalOn={totalResultModalFlag}
        onTotalResultModalClose={closeTotalResultModal}
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
