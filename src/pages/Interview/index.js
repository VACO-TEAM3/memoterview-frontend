import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import MainVideo from "../../components/MainVideo";
import Modal from "../../components/Modal";
import QuestionBoard from "../../components/QuestionBoard";
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

  button {
    width: 100px;
  }
`;

const VideoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 640px;

  .main-video {
    width: 640px;
    height: 480px;
  }

  .sub-videos {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 15rem);
    grid-column-gap: 15%;
    justify-items: center;
    justify-content: center;
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
        <button onClick={handleBackBtn}>BACK</button>
        <button onClick={handleOpenResumeButton}>이력서</button>
        {isResumeOpen && <div>이력서다!</div>}
        {!isInterviewee && <button onClick={handleOpenQuestionBoardOpen}>질문</button>}
        {!isInterviewee && <button ref={recordBtnElementRef} onClick={onProcessBtnClick}>{BUTTON_NAME[recordStateType]}</button>}
        <p>{recogText}</p>
        {isQuestionBoardOpen &&
          <QuestionBoard
            question={question}
            questions={questions}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        }
        <Timer />
        <VideoContent>
          <div className="main-video">
            <MainVideo videoRef={user} />
            <button onClick={handleAudio}>audio</button>
            <button onClick={handleVideo}>video</button>
          </div>
          <div className="sub-videos">
            {interviewers?.map((peer, index) => (
              <SubVideo key={index} peer={peer} />
            ))}
          </div>
        </VideoContent>
      </PageWrapper>
    </>
  );
}
