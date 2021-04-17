import React from "react";
import styled from "styled-components";

import ProjectsSideNavMenu from "../ProjectsSideNavMenu";
import UserInfo from "../UserInfo";

const ProjectsSideNavBarWrapper = styled.div`
  padding: 60px 30px;
  background-color: ${({ theme }) => theme.SideBarBackground};
`;

export default function ProjectsSideNavBar({ userInfo, onSideMenuChange }) {
  return (
    <ProjectsSideNavBarWrapper>
      <UserInfo userInfo={userInfo}/>
      <ProjectsSideNavMenu onMenuChange={onSideMenuChange}/>
    </ProjectsSideNavBarWrapper>
  );
}
