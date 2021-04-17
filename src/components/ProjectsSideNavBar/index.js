import React from "react";
import styled from "styled-components";

const ProjectsSideNavBarWrapper = styled.div`
  padding: 50px 30px;
  background-color: ${({ theme }) => theme.BabyPower};
`;

export default function ProjectsSideNavBar() {
  return (
    <ProjectsSideNavBarWrapper>
      ProjectSideNavBar
    </ProjectsSideNavBarWrapper>
  );
}

