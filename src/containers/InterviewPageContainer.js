import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

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
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [questionModalFlag, setQuestionModalFlag] = useState(true);
  const [totalResultModalFlag, setTotalResultModalFlag] = useState(false);
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
    console.log(projectId, intervieweeId);
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

    return () => {
      socket.disconnect();
    };
  }, [isStreaming]);

  function closeTotalResultModal() {
    setTotalResultModalFlag(false);
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

  const [filterRates, setFilterRates] = useState({});
  const [totalRate, setTotalRate] = useState(0);
  const [comment, setComment] = useState("");
  
  function handleFilterRate(rateOption, value) {
    console.log(filterRates);
    setFilterRates((prev) => ({ ...prev, [rateOption]: value }));
  }

  function handleTotalRate(_, value) {
    setTotalRate(value);
  }

  function handleCommentChange({ target: { value } }) {
    setComment(value);
  }

  function handleResultSubmit(event) {
    event.preventDefault();
    console.log(filterRates);
    dispatch(finishInterview({ 
      token, 
      projectId, 
      intervieweeId, 
      interviewee: {
        filterScores: { ...filterRates },
        questions: [{ // question 성공시..
          question: "adfdafafa",
          score: 24,
          answer: "afadfafafaf",
          questioner: "608056473ec0b1612a8ebce2",
        }],
        comments: {
          comment,
          score: totalRate,
          commentor: "607959226727251880113f56",
        },
      },
    }));
    
    history.push(`/projects/${projectId}`); // 결과 페이지로 바꿔야함
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
        onCommentChange={handleCommentChange}
        onResultSubmit={handleResultSubmit}
        onBackButtonClick={handleBackBtn}
      />
    </>
  );
}
