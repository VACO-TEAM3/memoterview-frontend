import React from "react";
import styled from "styled-components";

const ProjectsColumnHeaderWrapeer = styled.div`
  display: flex;
  height: 50px;
  margin: 0 20px;
  /* border: ${({ theme }) => `${theme.SideBarBackground} 1px solid`}; */
  border: 1px solid ${({ theme }) => theme.Snow };
  background-color: #f5f5f5;
  border-width: 0px 0px 2px 0px;
  border-radius: 2px;
`;

const ColumnTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.1rem;
`;

function ProjectsColumnHeader({ columnTitles }) {
  return (
    <ProjectsColumnHeaderWrapeer>
      {columnTitles.map((title) => <ColumnTitle key={title}>{title}</ColumnTitle>)}
    </ProjectsColumnHeaderWrapeer>
  );
}

export default React.memo(ProjectsColumnHeader);
