import React, { useState } from "react";
import styled from "styled-components";

import ProjectAddButton from "../ProjectAddButton";
import ProjectsColumnHeader from "../ProjectsColumnHeader";
import ProjectsEntry from "../ProjectsEntry";
import ProjectStatusMenus from "../ProjectStatusMenus";

const ProjectsContentWrapper = styled.div`
  padding: 20px;
`;

export default function ProjectsContent({
  onStatusMenuChange,
  projects,
  onProjectItemClick,
  onProjectAddBtnClick,
  onProjectDeleteBtnClick,
}) {
  return (
    <ProjectsContentWrapper>
      <ProjectStatusMenus onStatusMenuChange={onStatusMenuChange} />
      <ProjectsEntry
        projects={projects}
        onProjectItemClick={onProjectItemClick}
        onProjectDeleteBtnClick={onProjectDeleteBtnClick}
      />
      <ProjectAddButton onClick={onProjectAddBtnClick} />
    </ProjectsContentWrapper>
  );
}
