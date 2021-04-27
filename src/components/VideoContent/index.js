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

  .main-video {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .sub-videos {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

const VideoContentTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  padding: 0.1rem 0.3rem;
  background: #1E1E1E90;
  color: rgba(255, 255, 255);
  position: absolute;
  bottom: 0%;
  left: 0;
  font-weight: bold;
  border-radius: 3px;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 2;
  text-align: center;
`;

export default function VideoContent({ peers, user, isInterviewee }) {
  return (
    <VideoContentWrapper>
      <div className="main-video">
        <MainVideo videoRef={user} />
        <VideoContentTag color={isInterviewee ? "#D3635E" : "#61B153"}>
          {user.username || "ME"}
        </VideoContentTag>
      </div>
      {peers?.map((peer) => (
        <div key={peer.username} className="sub-videos">
          <SubVideo peer={peer} />
          <VideoContentTag color={peer.isInterviewee ? "#D3635E" : "#61B153"}>
            {peer.username || peer.isInterviewee ? "Interviewee" : "Interviewer"}
          </VideoContentTag>
        </div>
      ))}
    </VideoContentWrapper>
  );
}
