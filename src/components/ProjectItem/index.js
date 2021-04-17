import React from "react";
import styled from "styled-components";

import ProjectDeleteButton from "../ProjectDeleteButton";

const ProjectItemWrapper = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  border: ${({ theme }) => `${theme.SideBarBackground} 2px solid`};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => `${theme.BabyPowder}`};
  }

  &:not(:first-child) {
    border-top: none;
  }
`;

const ColumnItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1rem;
`;

export default function ProjectItem({ project, onDeleteBtnClick }) {
  function handleDeleteButtonClick() {
    onDeleteBtnClick && onDeleteBtnClick(project.id);
  }

  return (
    <ProjectItemWrapper>
      <ColumnItem>{project.title}</ColumnItem>
      <ColumnItem>{project.candidateNum}</ColumnItem>
      <ColumnItem>{project.createAt}</ColumnItem>
      <ProjectDeleteButton onClick={handleDeleteButtonClick}/>
    </ProjectItemWrapper>
  );
}
