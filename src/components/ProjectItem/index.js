import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

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

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  width: 10%;
  height: 100%;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => `${theme.Aero}`}
  }
`;

export default function ProjectItem({ project }) {
  return (
    <ProjectItemWrapper>
      <ColumnItem>{project.title}</ColumnItem>
      <ColumnItem>{project.candidateNum}</ColumnItem>
      <ColumnItem>{project.createAt}</ColumnItem>
      <DeleteButton>
        <FontAwesomeIcon icon={faTimes}/>
      </DeleteButton>
    </ProjectItemWrapper>
  );
}
