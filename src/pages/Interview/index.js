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
  width: 100%;
  min-height: 100%;
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
  const [isOnVideo, setIsOnVideo] = useState(true);
  const [isOnAudio, setIsOnAudio] = useState(true);
  const [modalFlag, setModalFlag] = useState(false);
  const history = useHistory();
  const { projectId, intervieweeId } = useParams();
  
  function handleAudio() {
    onAudioBtnClick(isOnAudio);
    onVideoBtnClick((prev) => !prev);
  }
  
  function handleVideo() {
    onVideoBtnClick(isOnVideo);
    setIsOnVideo((prev) => !prev);
  }

  function closeAddProjectModal() {
    setModalFlag(false);
  }

  function handleBackBtn() {
    if (isStart) {
      setModalFlag(true);
      
      return;
    }
    setModalFlag(true);
    console.log(modalFlag);
    // history.push(`/projects/${intervieweeId}`);
  }

  return (
    <PageWrapper>
      <button onClick={handleBackBtn}>BACK</button>
      {modalFlag && (
        <Modal onClick={closeAddProjectModal}>
          <InterviewTotalEvaluationModalView />
        </Modal>
      )}
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
  );
}
