import {
  faChevronLeft,
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewMenuButton from "../../components/InterviewMenuButton";
import StyledSideBar from "../../components/shared/StyledLeftSideBar";
import StyledVideoBottomBar from "../../components/shared/StyledVideoBottomBar";
import Timer from "../../components/Timer";
import VideoContent from "../../components/VideoContent";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(50deg, #1572b2, #8cced7) fixed;
`;

const InterviewContent = styled.div`
  position: fixed;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: calc(100vh - 250px);
  background: #2181B12e;

  border-radius: 10px;
`;

export default function InterviewInterviewee({
  user,
  interviewers,
  onAudioBtnClick,
  onVideoBtnClick,
  onBackButtonClick,
  time,
}) {
  // 이 부분들은 컨테이너로 다 빠질 것입니다. 컨테이너에서 소켓 작업을 하기 위해 임의로 올리지 않았습니다.
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  function handleAudio() {
    onAudioBtnClick(isAudioOn);
    setIsAudioOn((prev) => !prev);
  }

  function handleVideo() {
    onVideoBtnClick(isVideoOn);
    setIsVideoOn((prev) => !prev);
  }

  return (
    <>
      <PageWrapper>
        <StyledSideBar>
          <InterviewMenuButton
            name="BACK"
            onClick={onBackButtonClick}
            icon={faChevronLeft}
          />
        </StyledSideBar>
        <Timer time={time} />
        <InterviewContent>
          <VideoContent interviewers={interviewers} user={user} />
        </InterviewContent>
        <StyledVideoBottomBar>
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
        </StyledVideoBottomBar>
      </PageWrapper>
    </>
  );
}
