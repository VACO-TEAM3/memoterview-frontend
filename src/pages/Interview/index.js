import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import MainVideo from "../../components/MainVideo";
import Modal from "../../components/Modal";
import SubVideo from "../../components/SubVideo";
import Timer from "../../components/Timer";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  justify-content: center;
  justify-items: center;
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
  interviewers, 
  user, 
  onAudioBtnClick, 
  onVideoBtnClick,
  isStart,
}) {
  // 이 부분들은 컨테이너로 다 빠질 것입니다. 컨테이너에서 소켓 작업을 하기 위해 임의로 올리지 않았습니다.
  const [isOnVideo, setIsOnVideo] = useState(true);
  const [isOnAudio, setIsOnAudio] = useState(true);
  const [modalFlag, setModalFlag] = useState(false);
  const [isResumeOpen, setIsResumeOpend] = useState(false);
  const [isQuestionBoardOpen, setIsQuestionBoardOpen] = useState(false);
  const history = useHistory();
  const { projectId, intervieweeId } = useParams();
  
  function handleAudio() {
    onAudioBtnClick(isOnAudio);
    setIsOnAudio((prev) => !prev);
  }
  
  function handleVideo() {
    onVideoBtnClick(isOnVideo);
    setIsOnVideo((prev) => !prev);
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
        <button onClick={handleOpenQuestionBoardOpen}>질문</button>
        {isQuestionBoardOpen && <div>질문이다!</div>}
        <Timer />
        <VideoContent>
          <div classname="main-video">
            <MainVideo videoRef={user} />
            <button onClick={handleAudio}>audio</button>
            <button onClick={handleVideo}>video</button>
          </div>
          <div classname="sub-videos">
            {interviewers?.map((peer, index) => (
              <SubVideo key={index} peer={peer} />
            ))}
          </div>
        </VideoContent>
      </PageWrapper>
    </>
  );
}
