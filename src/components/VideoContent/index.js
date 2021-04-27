import styled from "styled-components";

import MainVideo from "../MainVideo";
import SubVideo from "../SubVideo";

const VideoContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, auto);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  width: 48vw;
  height: 50vh;
`;

export default function VideoContent({ interviewers, user }) {
  return (
    <VideoContentWrapper>
      <div className="main-video">
        <MainVideo videoRef={user} />
      </div>
      {interviewers?.map((peer) => (
        <div key={peer.peerID} className="sub-videos">
          <SubVideo peer={peer} />
        </div>
      ))}
    </VideoContentWrapper>
  );
}
