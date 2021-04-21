import styled from "styled-components";

import MainVideo from "../../components/MainVideo";
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

export default function Interview({ interviewers, user }) {
  return (
    <PageWrapper>
      <Timer />
      <VideoContent>
        <div classname="main-video">
          <MainVideo videoRef={user} />
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
