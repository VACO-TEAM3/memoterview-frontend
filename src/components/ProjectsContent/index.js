
import React from "react";
import styled from "styled-components";

import ProjectAddButton from "../ProjectAddButton";
import ProjectsEntry from "../ProjectsEntry";
import ProjectStatusMenus from "../ProjectStatusMenus";

const ProjectsContentWrapper = styled.div`
  padding: 20px;
`;

export default function ProjectsContent({ onStatusMenuChange, projects, onProjectAddBtnClick }) {
  return (
    <ProjectsContentWrapper>
      <ProjectStatusMenus onStatusMenuChange={onStatusMenuChange} />
      <ProjectsEntry projects={projects}/>
      <ProjectAddButton onClick={onProjectAddBtnClick}/>
    </ProjectsContentWrapper>
  );
}
