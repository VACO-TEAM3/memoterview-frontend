import React from "react";
import styled from "styled-components";

import ProjectsContent from "../../components/ProjectsContent";
import ProjectsSideNavBar from "../../components/ProjectsSideNavBar";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

const projectMockData = [
  {
    "id": "sfsdfdsfafewf",
    "title": "Frontend 주니어 채용",
    "candidateNum": 30,
    "filters": ["컬쳐핏", "커뮤니케이션"],
    "creator": "dfsdslfawef34",
    "participants": ["sdfsdfsdf334", "fewifjeio23r35"],
    "createAt": "2021-04-10",
  },
  {
    "id": "fdfsdfdsfsdf",
    "title": "Backend 주니어 채용",
    "candidateNum": 14,
    "filters": ["컬쳐핏", "커뮤니케이션"],
    "creator": "dfsdslfawef34",
    "participants": ["sdfsdfsdf334", "fewifjeio23r35"],
    "createAt": "2021-04-10",
  }
];

export default function Projects() {
  const userInfoSample = {
    userName: "최하영",
    userEmail: "hayeong28@naver.com",
  };

  function handleSideMenuChange(menu) {
    console.log(menu);
  }

  function handleLogoutBtnClick() {
    console.log("click logout");
  }

  function handleStatusMenuChange(statusMenu) {
    console.log(statusMenu);
  }

  return (
    <SplitLayout>
      <ProjectsSideNavBar
        userInfo={userInfoSample}
        onSideMenuChange={handleSideMenuChange}
        onLogoutBtnClick={handleLogoutBtnClick}
      />
      <ProjectsContent 
        onStatusMenuChange={handleStatusMenuChange}
        projects={projectMockData}
      />
    </SplitLayout>
  );
}
