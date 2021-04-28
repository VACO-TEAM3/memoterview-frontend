import { faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VideoContentTag from "../shared/StyledVideoContentTag";

export default function VideoContentNameTag({ isInterviewee, isAudioOn, children }) {
  return (
    <VideoContentTag color={isInterviewee ? "#D3635E" : "#61B153"}>
      <FontAwesomeIcon icon={isAudioOn ? faMicrophoneAlt : faMicrophoneAltSlash} />
      {children}
    </VideoContentTag>
  );
}
