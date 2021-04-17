import React from "react";
import styled from "styled-components";

import ProjectsEntry from "../ProjectsEntry";
import ProjectStatusMenus from "../ProjectStatusMenus";

const ProjectsContentWrapper = styled.div`
  padding: 20px;
`;

export default function ProjectsContent({ onStatusMenuChange, projects }) {
  return (
    <ProjectsContentWrapper>
      <ProjectStatusMenus onStatusMenuChange={onStatusMenuChange} />
      <ProjectsEntry projects={projects}/>
    </ProjectsContentWrapper>
  );
}
