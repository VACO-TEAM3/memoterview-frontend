import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 4.2rem;
  height: 3.3rem;
  background: ${({ color }) => color};
  opacity: 0.6;
  color: white;
  border-radius: 30px;
  z-index: 2;

  :hover {
    background: white;
    color: ${({ color }) => color};
    opacity: 0.6;
    border: 1px solid #B6BFC4;
  }

  .button-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .button-icon {
      width: 1.2rem;
      height: 1.2rem;
      margin-bottom: 0.2rem;
      top: 30%;
    }

    .button-name {
      font-size: 0.5rem;
    }
  }
`;

export default function InterviewButton({ buttonRef, onClick, state }) {
  return (
    <ButtonWrapper color={state.color}>
      <div className="button-content" ref={buttonRef} onClick={onClick}>
        <FontAwesomeIcon icon={state.icon} className="button-icon" />
        <div className="button-name">{state.state}</div>
      </div>
    </ButtonWrapper>
  );
}
