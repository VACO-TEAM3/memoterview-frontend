import { faChevronLeft, faFile, faQuestion, faVideo, faVideoSlash, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewSideBarButton from "../../components/IconButton";
import InterviewButton from "../../components/InterviewButton";
import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import Modal from "../../components/Modal";
import QuestionBoard from "../../components/QuestionBoard";
import SideBar from "../../components/SideBar";
import Timer from "../../components/Timer";
import VideoContent from "../../components/VideoContent";
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
  background: linear-gradient(50deg, #1572B2, #8CCED7) fixed;

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
    width: 50%;
    height: 83%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    .interview-content-bottom-bar {
      display: flex;
      width: 18%;
      height: 7%;
      align-items: center;
      justify-content: space-evenly;
      justify-items: center;
      margin-top: 3%;
    }
  }
`;

export default function Interview({
  user,
  userData,
  interviewers,
  recordBtnElementRef,
  recordStateType,
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
  console.log(userData);
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
          <VideoContent interviewers={interviewers} user={user} />
          <div className="interview-content-bottom-bar">
            <CircleButton 
              onClick={handleAudio} 
              isClicked={isAudioOn} 
              clickedState={faVolumeMute} 
              unClickedState={faVolumeUp} 
            />
            {!isInterviewee && 
              <InterviewButton 
                videoRef={recordBtnElementRef} 
                onClick={onProcessBtnClick}
                state={BUTTON_NAME[recordStateType]}
              />
            }
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
