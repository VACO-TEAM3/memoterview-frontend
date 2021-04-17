import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ProjectOptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 20px;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

const OptionText = styled.span`
  padding: 3px 10px 0;
  width: 80%;
  height: 20px;
  font-size: .9rem;
`;

const DeleteButton = styled.span`
  &:hover {
    color: ${({ theme }) => `${theme.Aero}`}
  }
`;

export default function ProjectOptionItem({ option, onOptionDelete }) {
  function handleOptionDeleteBtnClick() {
    onOptionDelete(option);
  }

  return (
    <ProjectOptionItemWrapper>
      <OptionText>
        {option}
      </OptionText>
      <DeleteButton onClick={handleOptionDeleteBtnClick}>
        <FontAwesomeIcon icon={faTimes} />
      </DeleteButton>
    </ProjectOptionItemWrapper>
  );
}
