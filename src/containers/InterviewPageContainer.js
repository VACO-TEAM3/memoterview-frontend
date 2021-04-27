import "react-toastify/dist/ReactToastify.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import { updateIntervieweeAnswer } from "../api";
import {
  INTERVIEWEE_TOAST_MESSAGE,
  INTERVIEWER_TOAST_MESSAGE,
  RECORD_STATE_TYPE,
} from "../constants/recordState";
import useInterviewRecord from "../hooks/useInterviewRecord";
import useTimer from "../hooks/useTimer";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import InterviewInterviewee from "../pages/InterviewInterviewee";
import { finishInterview } from "../redux/reducers/interviewees";
import { getProjectById } from "../redux/reducers/projects";
import { mediaOptions, mediaStream } from "../utils/media";
import genUuid from "../utils/uuid";
import { validateInput, validateResultSubmit } from "../utils/validation";

export default function InterviewPageContainer() {
  const socket = useMemo(
    () => io.connect(process.env.REACT_APP_INTERVIEW_SOCKET_SERVER),
    []
  );
  const dispatch = useDispatch();

  const { intervieweeId, projectId } = useParams();

  const { userData } = useSelector(({ user }) => ({ userData: user.userData }));
  const { byId } = useSelector(({ interviewees }) => ({
    byId: interviewees.byId,
  }));

  const { project } = useSelector(({ projects }) => ({
    project: getProjectById(projects, projectId),
  }));

  const intervieweeData = byId[intervieweeId];
  const [isStreaming, setIsStreaming] = useState(false);
  const [filterScores, setFilterScores] = useState({});
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
  const isInterviewee = false;

  //////////////////////////하영작업///////////////////////
  const {
    recordStateType,
    visibilityRecordStateType,
    recogText,
    setNextRecordStateType,
    answer,
    question,
    uploadComplete,
    isDisabled,
  } = useInterviewRecord({
    socket,
    userId: userData.isInterviewee ? genUuid() : userData.id,
    isInterviewee: userData.isInterviewee,
    setTimerActive: setIsActive,
  });
  //////////////////////////////////////////////////////
  useEffect(() => {
    const toastMsg = getToastMessage(
      userData.isInterviewee,
      visibilityRecordStateType
    );
    toast(toastMsg);
  }, [userData.isInterviewee, visibilityRecordStateType]);

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
      const [currentPeer] = peersRef.current.filter(
        (peer) => peer.peerID === id
      );

      currentPeer?.peer.destroy();

      const filteredPeers = peersRef.current.filter(
        (peer) => peer.peerID !== id
      );

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

  function closeTotalResultModal() {
    setTotalResultModalFlag(false);
  }

  function closeQuestionModal() {
    setQuestionModalFlag(false);
  }

  function handleBackBtn() {
    if (userData.isInterviewee) {
      return history.push("/interviewEnd");
    }

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
    if (isDisabled) {
      alert("아직 면접자가 오지 않았습니다.");
      return;
    }

    if (RECORD_STATE_TYPE.ANSWERING === recordStateType) {
      setQuestionModalFlag(true);
    }

    setNextRecordStateType();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        if (isDisabled) {
          alert("아직 면접자가 오지 않았습니다.");
          return;
        }

        if (RECORD_STATE_TYPE.ANSWERING === recordStateType) {
          setQuestionModalFlag(true);
        }

        setNextRecordStateType();
      }
    },
    [isDisabled, recordStateType, setNextRecordStateType]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  function handleFilterRate(rateOption, value) {
    setFilterScores((prev) => ({ ...prev, [rateOption]: value }));
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

    if (!validateResultSubmit({ filterScores, totalRate, comment })) {
      setErrorMessage("모든 항목에 체크해주세요!"); // 일괄 적용 필요함.. 뭐라할까나..

      return;
    }

    dispatch(finishInterview({
      token,
      projectId,
      intervieweeId,
      interviewee: {
        filterScores,
        comments: {
          comment,
          score: totalRate,
          commenter: userData.id,
        },
      },
    }));

    history.push(`/projects/${projectId}`); // 결과 페이지로 바꿔야함
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault();

    if (!validateInput(questionRate)) {
      setErrorMessage("점수를 체크해주세요!"); // error message 형식 임의..

      return;
    }

    await updateIntervieweeAnswer({
      intervieweeId,
      projectId,
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
      {userData.isInterviewee ? (
        <InterviewInterviewee
          user={userVideo}
          interviewers={peers}
          onAudioBtnClick={handleAudio}
          onVideoBtnClick={handleVideo}
          onBackButtonClick={handleBackBtn}
          time={time}
        />
      ) : (
        <Interview
          time={time}
          intervieweeData={intervieweeData}
          isQuestionModalOn={questionModalFlag}
          isTotalResultModalOn={totalResultModalFlag}
          onTotalResultModalClose={closeTotalResultModal}
          project={project}
          user={userVideo}
          userData={userData}
          interviewers={peers}
          isButtonDisabled={isDisabled}
          recordStateType={recordStateType}
          visibilityRecordStateType={visibilityRecordStateType}
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
      )}
    </>
  );
}

function getToastMessage(isInterviewee, recordState) {
  if (isInterviewee) {
    return INTERVIEWEE_TOAST_MESSAGE[recordState];
  }

  return INTERVIEWER_TOAST_MESSAGE[recordState];
}
