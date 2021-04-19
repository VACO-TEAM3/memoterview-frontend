import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MENUS, PROJECT_TYPES } from "../constants/projects";
import Projects from "../pages/Projects";
import { deleteProject, getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { changeDateFormat } from "../utils/date";

export default function ProjectsPageContainer() {
  const dispatch = useDispatch();
  const { user: { token, userData: { id, username, email } } } = useSelector(({ user }) => ({ user }));
  const { projects: { byId, visibleProjects } } = useSelector(({ projects }) => ({ projects }));

  const [projects, setProjects] = useState(PROJECT_TYPES.MY_PROJECTS);
  const currentDisplayingField = visibleProjects[projects];

  const userInfo = {
    userName: username,
    userEmail: email,
  };

  useEffect(() => {
    dispatch(getMyProjects({ userId: id, token }));
  }, []);

  function setProjectFormat(projects) {
    return projects.map(projectId => {
      const { id, title, candidateNum, createAt } = byId[projectId];
      const formattedDate = changeDateFormat(createAt, "yyyy-MM-dd");

      return {
        id,
        title,
        candidateNum,
        createAt: formattedDate,
      };
    });
  }

  function handleSideMenuChange(menu) {
    if (menu === MENUS.MY) {
      return setProjects(PROJECT_TYPES.MY_PROJECTS);
    } else {
      if (!visibleProjects[PROJECT_TYPES.JOINED_PROJECTS].length){
        dispatch(getJoinedProjects({ userId: id, token }));
        return setProjects(PROJECT_TYPES.JOINED_PROJECTS);
      }

      setProjects(PROJECT_TYPES.JOINED_PROJECTS);
    }
  }

  function handleProjectDeleteBtnClick(projectId) {
    dispatch(deleteProject({ projectId: projectId, token }));
  }

  return (
    <>
      <Projects
        userInfo={userInfo}
        projects={setProjectFormat(currentDisplayingField)}
        handleStatusMenuChange={() => {}}
        handleSideMenuChange={handleSideMenuChange}
        handleProjectDeleteBtnClick={handleProjectDeleteBtnClick}
      />
    </>
  );
}
