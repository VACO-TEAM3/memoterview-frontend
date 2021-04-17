import React from "react";
import styled from "styled-components";

import ProjectStatusMenus from "../ProjectStatusMenus";

const ProjectsContentWrapper = styled.div`
  padding: 20px;
`;

export default function ProjectsContent({ onStatusMenuChange }) {
  return (<ProjectsContentWrapper>
    <ProjectStatusMenus onStatusMenuChange={onStatusMenuChange}/>
  </ProjectsContentWrapper>);
}
