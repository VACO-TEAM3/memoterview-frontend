import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #5D5F5F;
  opacity: 0.6;
  color: white;
  border-radius: 75px;
`;

export default function CircleButton({ onClick, isClicked, clickedState, unClickedState }) {
  return (
    <ButtonWrapper>
      <div className="interview-content-bottom-button" onClick={onClick}>
        <FontAwesomeIcon icon={isClicked ? clickedState : unClickedState} />
      </div>
    </ButtonWrapper>
  );
}
