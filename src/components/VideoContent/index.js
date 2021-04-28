import styled from "styled-components";

import MainVideo from "../MainVideo";
import SubVideo from "../SubVideo";
import VideoContentNameTag from "../VideoContentNameTag";

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

export default function VideoContent({ peers, user, isInterviewee }) {
  return (
    <VideoContentWrapper>
      <div className="main-video">
        <MainVideo videoRef={user} />
        <VideoContentNameTag isInterviewee={isInterviewee}>
          {user.current?.username || "ME"}
        </VideoContentNameTag>
      </div>
      {peers?.map((peer) => (
        <div key={peer.username} className="sub-videos">
          <SubVideo peer={peer} />
          <VideoContentNameTag isInterviewee={peer.isInterviewee} isAudioOn={peer.isAudioOn}>
            {peer.username || peer.isInterviewee ? "Interviewee" : "Interviewer"}
          </VideoContentNameTag>
        </div>
      ))}
    </VideoContentWrapper>
  );
}
