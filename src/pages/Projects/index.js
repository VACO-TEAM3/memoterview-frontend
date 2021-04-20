import React from "react";
import styled from "styled-components";

import ProjectsContent from "../../components/ProjectsContent";
import ProjectsSideNavBar from "../../components/ProjectsSideNavBar";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

export default function Projects({
  userInfo,
  projects,
  onSideMenuChange,
  onProjectDeleteBtnClick,
  onProjectAddBtnClick,
}) {
  function handleLogoutBtnClick() {
    console.log("click logout");
  }

  function handleProjectItemClick(projectId) {
    console.log("click project item", projectId);
  }

  function handleStatusMenuChange(statusMenuType) {
    console.log(statusMenuType, `clicked status menu ${statusMenuType}`);
  }

  return (
    <>
      <SplitLayout>
        <ProjectsSideNavBar
          userInfo={userInfo}
          onSideMenuChange={onSideMenuChange}
          onLogoutBtnClick={handleLogoutBtnClick}
        />
        <ProjectsContent
          onStatusMenuChange={handleStatusMenuChange}
          onProjectItemClick={handleProjectItemClick}
          onProjectAddBtnClick={onProjectAddBtnClick}
          onProjectDeleteBtnClick={onProjectDeleteBtnClick}
          projects={projects}
        />
      </SplitLayout>
    </>
  );
}
