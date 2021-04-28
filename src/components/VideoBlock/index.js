import { faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import MainVideo from "../MainVideo";
import VideoContentTag from "../shared/StyledVideoContentTag";
import SubVideo from "../SubVideo";

const Video = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default function VideoBlock({ video, isUser, isInterviewee, isAudioOn, children }) {
  return (
    <Video>
      {isUser 
        ? <MainVideo videoRef={video} /> 
        : <SubVideo peer={video} />
      }
      <VideoContentTag color={isInterviewee ? "#D3635E" : "#61B153"}>
        {
          !isUser && (
            <FontAwesomeIcon
              icon={isAudioOn ? faMicrophoneAlt : faMicrophoneAltSlash}
            />
          )
        }
        {children}
      </VideoContentTag>
    </Video>
  );
}
