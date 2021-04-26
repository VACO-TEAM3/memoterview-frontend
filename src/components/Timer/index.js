import { faRecordVinyl, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  top: 23.5%;
  width: 5%;
  height: 3%;
  background: transparent;
  font-weight: bold;
  color: #969593;
  position: absolute;
  border-radius: 15px;
  border: 3px solid #D3D2CD;
  z-index: 1;

  .timer-icon {
    color: ${(({ isRecording }) => isRecording ? "red" : "green")};
  }
`;

export default function Timer({ isRecording, time }) {
  const { hour, min } = time;
  return (
    <TimerWrapper isRecording={isRecording}>
      <div className="timer-icon">
        <FontAwesomeIcon icon={isRecording? faRecordVinyl : faStopCircle} />
      </div>
      {`${hour}:${min}`}
    </TimerWrapper>
  );
}
