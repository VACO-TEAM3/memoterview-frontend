import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../../components/Modal";
import ProjectAddModalView from "../../components/ProjectAddModalView";
import ProjectsContent from "../../components/ProjectsContent";
import ProjectsSideNavBar from "../../components/ProjectsSideNavBar";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

export default function Projects({ projects, handleStatusMenuChange, handleSideMenuChange }) {
  const [modalFlag, setModalFlag] = useState(false);

  const userInfoSample = {
    userName: "최하영",
    userEmail: "hayeong28@naver.com",
  };

  function handleLogoutBtnClick() {
    console.log("click logout");
  }

  function handleProjectAddBtnClick() {
    console.log("click project add button");
    openAddProjectModal();
  }

  function handleProjectDeleteBtnClick(projectId) {
    console.log("click project delete button", projectId);
  }

  function handleProjectItemClick(projectId) {
    console.log("click project item", projectId);
  }

  function closeAddProjectModal() {
    setModalFlag(false);
  }

  function openAddProjectModal() {
    setModalFlag(true);
  }

  return (
    <>
      {modalFlag && (
        <Modal onClick={closeAddProjectModal}>
          <ProjectAddModalView />
        </Modal>
      )}
      <SplitLayout>
        <ProjectsSideNavBar
          userInfo={userInfoSample}
          onSideMenuChange={handleSideMenuChange}
          onLogoutBtnClick={handleLogoutBtnClick}
        />
        <ProjectsContent
          onStatusMenuChange={handleStatusMenuChange}
          onProjectItemClick={handleProjectItemClick}
          onProjectAddBtnClick={handleProjectAddBtnClick}
          onProjectDeleteBtnClick={handleProjectDeleteBtnClick}
          projects={projects}
        />
      </SplitLayout>
    </>
  );
}
