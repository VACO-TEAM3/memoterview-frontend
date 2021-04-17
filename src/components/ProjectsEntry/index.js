import React from "react";
import styled from "styled-components";

import ProjectItem from "../ProjectItem";
import ProjectsColumnHeader from "../ProjectsColumnHeader";

const ProjectsEntryWrapper = styled.div`
  padding: 20px;
`;

function ProjectsEntry({ projects }) {
  const columnTitles = ["Job title", "Candidates", "Created at"];

  return (
    <div>
      <ProjectsColumnHeader columnTitles={columnTitles} />
      <ProjectsEntryWrapper>
        {projects.map((project) => <ProjectItem project={project} />)}
      </ProjectsEntryWrapper>
    </div>
  );
}

ProjectsEntry.defaultProps = {
  projects: [],
};

export default ProjectsEntry;
