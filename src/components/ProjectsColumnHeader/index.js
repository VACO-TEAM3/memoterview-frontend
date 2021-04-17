import React from "react";
import styled from "styled-components";

const ProjectsColumnHeaderWrapeer = styled.div`
  display: flex;
  height: 50px;
  border: ${({ theme }) => `${theme.SideBarBackground} 2px solid`};
  border-radius: 5px;
`;

const ColumnTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.1rem;
`;

export default function ProjectsColumnHeader({ columnTitles }) {
  return (
    <ProjectsColumnHeaderWrapeer>
      {columnTitles.map((title) => <ColumnTitle>{title}</ColumnTitle>)}
    </ProjectsColumnHeaderWrapeer>
  );
}
