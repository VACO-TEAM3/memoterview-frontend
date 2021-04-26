import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 4.2rem;
  height: 3.3rem;
  background: ${({ normalColor }) => normalColor};
  opacity: 0.6;
  color: white;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 30px;
  z-index: 2;

  :hover {
    background: ${({ hoverColor }) => hoverColor};
    opacity: 0.6;
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

export default function InterviewButton({ isButtonDisabled, onClick, state }) {
  return (
    <ButtonWrapper 
      hoverColor={state.color.hoverColor} 
      normalColor={state.color.normalColor} 
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <div className="button-content">
        <FontAwesomeIcon icon={state.icon} className="button-icon" />
        <div className="button-name">{state.state}</div>
      </div>
    </ButtonWrapper>
  );
}
