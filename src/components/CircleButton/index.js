import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(93, 95, 95, 0.6);
  color: white;
  border-radius: 75px;
  z-index: 2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;

  :hover {
    background: #5D5F5F;
    color: white;
  }
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
