import { faRecordVinyl, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import useTimer from "../../hooks/useTimer";

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  top: 23%;
  width: 4%;
  height: 3%;
  background: transparent;
  font-weight: bold;
  color: #969593;
  position: absolute;
  border-radius: 15px;
  border: 3px solid #D3D2CD;
  z-index: 2;

  .timer-icon {
    color: ${(({ isRecording }) => isRecording ? "red" : "green")};
  }
`;

export default function Timer({ onToggle, isRecording }) {
  const { time: { hour, min }, handleStart, handleStop } = useTimer();

  return (
    <TimerWrapper onClick={handleStart} onSubmit={handleStop} isRecording={isRecording}>
      <div className="timer-icon">
        <FontAwesomeIcon icon={isRecording? faRecordVinyl : faStopCircle} />
      </div>
      {`${hour}:${min}`}
    </TimerWrapper>
  );
}
