import React from "react";
import styled from "styled-components";

import ProjectsColumnHeader from "../ProjectsColumnHeader";

const ProjectsEntryWrapper = styled.div`

`;

function ProjectsEntry({ projects }) {
  const columnTitles = ["Job title", "Candidates", "Created at"];

  return (<ProjectsEntryWrapper>
    <ProjectsColumnHeader columnTitles={columnTitles}/>
  </ProjectsEntryWrapper>);
}

ProjectsEntry.defaultProps = {
  projects: [],
};

export default ProjectsEntry;
