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
        userVideo.current.username = userData.username;

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
    
    socket.on("joinSuccess", (targetUsers) => {
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", {
            isInterviewee: userData.isInterviewee,
            callee: user.socketID,
            caller: socket.id,
            signal,
            name: userData.username,
          });
        });

        setPeers((prev) => [
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
    
    socket.on("joinNewUser", ({ signal, caller, isInterviewee, name }) => {
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

    socket.on("someUserVideoOff", (userID) => {});
    socket.on("someUserVideoOn", (userID) => {});
    socket.on("someUserAudioOff", (userID) => {});
    socket.on("someUserAudioOn", (userID) => {});

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

  const ProcessInterview = useCallback(() => {
    if (isDisabled) {
      switch (recordStateType) {
        case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
          return toast.error("아직 면접자가 오지 않았습니다.");
        case RECORD_STATE_TYPE.QUESTION_BEFORE:
          return toast.error("다른사람의 질의 응답중에는 질문할 수 없습니다.");
        default:
          return toast.error("질문할 수 없습니다.");
      }
    }

    if (RECORD_STATE_TYPE.ANSWERING === recordStateType) {
      setQuestionModalFlag(true);
    }

    setNextRecordStateType();
  }, [isDisabled, recordStateType, setNextRecordStateType]);

  function handleProcessBtnClick() {
    ProcessInterview();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        ProcessInterview();
      }
    },
    [ProcessInterview]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDisabled]);

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

    dispatch(
      finishInterview({
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
      })
    );

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

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  function handleVideo() {
    if (isVideoOn) {
      mediaOptions.videoOff(stream);
      socket.emit("videoOff", {})
    } else {
      mediaOptions.videoOn(stream);
    }
    socket.emit("VideoOff", );
    socket.emit("VideoOn", );
    socket.emit("AudioOff", );
    socket.emit("AudioOn", );
    setIsVideoOn(!isVideoOn);
  }

  function handleAudio() {
    if (isAudioOn) {
      mediaOptions.audioOff(stream);
    } else {
      mediaOptions.audioOn(stream);
    }

    setIsAudioOn(!isAudioOn);
  }

  return (
    <>
      {userData.isInterviewee ? (
        <InterviewInterviewee
          user={userVideo}
          interviewers={peers}
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onAudioBtnClick={handleAudio}
          onVideoBtnClick={handleVideo}
          onBackButtonClick={handleBackBtn}
          time={time}
        />
      ) : (
        <Interview
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onAudioBtnClick={handleAudio}
          onVideoBtnClick={handleVideo}
          time={time}
          intervieweeData={intervieweeData}
          isQuestionModalOn={questionModalFlag}
          isTotalResultModalOn={totalResultModalFlag}
          onTotalResultModalClose={closeTotalResultModal}
          project={project}
          user={userVideo}
          userData={userData}
          recogText={recogText}
          questionTranscript={question}
          answer={answer}
          interviewers={peers}
          isButtonDisabled={isDisabled}
          recordStateType={recordStateType}
          visibilityRecordStateType={visibilityRecordStateType}
          isInterviewee={userData.isInterviewee}
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
