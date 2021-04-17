import React from "react";
import styled from "styled-components";

import UserInfo from "../UserInfo";

const ProjectsSideNavBarWrapper = styled.div`
  padding: 50px 30px;
  background-color: ${({ theme }) => theme.SideBarBackground};
`;

export default function ProjectsSideNavBar() {
  return (
    <ProjectsSideNavBarWrapper>
      <UserInfo />
    </ProjectsSideNavBarWrapper>
  );
}
