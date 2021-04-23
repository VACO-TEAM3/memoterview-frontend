import { faChevronLeft, faFile, faQuestion, faVideo, faVideoSlash, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewSideBarButton from "../../components/IconButton";
import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import MainVideo from "../../components/MainVideo";
import Modal from "../../components/Modal";
import QuestionBoard from "../../components/QuestionBoard";
import SideBar from "../../components/SideBar";
import SubVideo from "../../components/SubVideo";
import Timer from "../../components/Timer";
import { BUTTON_NAME } from "../../constants/recordState";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background: linear-gradient(50deg, #1978AB, #8CCED7) fixed;

  .interview-sidebar-icons {
    display: flex;
    flex-direction: column;
  }

  .interview-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 55%;
    height: 80%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    .interview-videos-box {
      display: grid;
      width: 75%;
      margin-top: 8%;
      justify-content: center;
      align-content: center;
      align-items: center;
      grid-template-rows: repeat(2, auto);
      grid-template-columns: repeat(2, auto);
      grid-row-gap: 4%;
      grid-column-gap: 4%;
    }

    .interview-content-bottom-bar {
      display: flex;
    }
  }
`;

export default function Interview({
  user,
  interviewers,
  recordBtnElementRef,
  recordStateType,
  recogText,
  isInterviewee,
  onAudioBtnClick,
  onVideoBtnClick,
  onProcessBtnClick,
  onIntervieweeResumeShowingBtnClick,
  isStart = false,
}) {
  // 이 부분들은 컨테이너로 다 빠질 것입니다. 컨테이너에서 소켓 작업을 하기 위해 임의로 올리지 않았습니다.
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [modalFlag, setModalFlag] = useState(false);
  const [isResumeOpen, setIsResumeOpend] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isQuestionBoardOpen, setIsQuestionBoardOpen] = useState(false);
  const history = useHistory();
  const { projectId, intervieweeId } = useParams();

  function handleAudio() {
    onAudioBtnClick(isAudioOn);
    setIsAudioOn((prev) => !prev);
  }

  function handleVideo() {
    onVideoBtnClick(isVideoOn);
    setIsVideoOn((prev) => !prev);
  }

  function closeTotalResultModal() {
    setModalFlag(false);
  }

  function handleBackBtn() {
    if (isStart) {
      setModalFlag(true);
      return;
    }

    history.push(`/projects/${projectId}`);
  }

  function handleOpenResumeButton() {
    setIsResumeOpend((prev) => !prev);
  }

  function handleOpenQuestionBoardOpen() {
    setIsQuestionBoardOpen((prev) => !prev);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    setQuestions((prev) => [...prev, question]);
    setQuestion("");
  }

  function handleInputChange(ev) {
    const { target: { value } } = ev;

    setQuestion(value);
  }

  return (
    <>
      {modalFlag && (
        <Modal onBackgroundClick={closeTotalResultModal}>
          <InterviewTotalEvaluationModalView />
        </Modal>
      )}
      <PageWrapper>
        <SideBar>
          <div className="interview-sidebar-icons">
            <InterviewSideBarButton icon={faChevronLeft} onClick={handleBackBtn} />
            <InterviewSideBarButton icon={faFile} onClick={handleOpenResumeButton} />
            {isResumeOpen && <div>이력서다!</div>}
            <InterviewSideBarButton icon={faQuestion} onClick={handleOpenQuestionBoardOpen} />
            {isQuestionBoardOpen &&
              <QuestionBoard
                question={question}
                questions={questions}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            }
          </div>
        </SideBar>
        <Timer />
        <div className="interview-content">
          <div className="interview-videos-box">
            <div classname="main-video">
              <MainVideo videoRef={user} />
            </div>
            {interviewers?.map((peer, index) => (
              <div classname="sub-videos">
                <SubVideo key={index} peer={peer} />
              </div>
            ))}
          </div>
          <div className="interview-content-bottom-bar">
            <CircleButton 
              onClick={handleAudio} 
              isClicked={isAudioOn} 
              clickedState={faVolumeMute} 
              unClickedState={faVolumeUp} 
            />
            <CircleButton 
              onClick={handleVideo} 
              isClicked={isVideoOn} 
              clickedState={faVideoSlash} 
              unClickedState={faVideo} 
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
