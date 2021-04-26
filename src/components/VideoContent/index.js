import styled from "styled-components";

import MainVideo from "../MainVideo";
import SubVideo from "../SubVideo";

const VideoContentWrapper = styled.div`
  display: grid;
  width: 65%;
  height: 62%;
  margin-top: 12%;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, auto);
  grid-row-gap: 4%;
  grid-column-gap: 4%;
`;

export default function VideoContent({ interviewers, user }) {
  console.log("interviewers", interviewers);
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
