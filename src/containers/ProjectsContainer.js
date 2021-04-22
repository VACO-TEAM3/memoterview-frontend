import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Modal from "../components/Modal";
import ProjectAddModalView from "../components/ProjectAddModalView";
import { MENUS, PROJECT_TYPES } from "../constants/projects";
import useToken from "../hooks/useToken";
import Projects from "../pages/Projects";
import {
  addMyProject,
  deleteProject,
  getJoinedProjects,
  getMyProjects,
  projectIdsToByIdObjs,
} from "../redux/reducers/projects";

export default function ProjectsPageContainer() {
  const history = useHistory();
  const { token } = useToken();
  const dispatch = useDispatch();
  const {
    user: {
      userData: { id, username, email },
    },
  } = useSelector(({ user }) => ({ user }));
  const {
    projects: { byId, visibleProjects },
  } = useSelector(({ projects }) => ({ projects }));

  const [projectType, setProjectType] = useState(PROJECT_TYPES.MY_PROJECTS);
  const [modalFlag, setModalFlag] = useState(false);

  //todo. active closed 구분하기
  const projects = projectIdsToByIdObjs(visibleProjects[projectType], byId);

  const userInfo = {
    userName: username,
    userEmail: email,
  };

  useEffect(() => {
    dispatch(getMyProjects({ userId: id, token }));
  }, [dispatch, id, token]);

  function handleSideMenuChange(menu) {
    if (menu === MENUS.MY) {
      return setProjectType(PROJECT_TYPES.MY_PROJECTS);
    } else {
      if (!visibleProjects[PROJECT_TYPES.JOINED_PROJECTS].length) {
        dispatch(getJoinedProjects({ userId: id, token }));
      }

      setProjectType(PROJECT_TYPES.JOINED_PROJECTS);
    }
  }

  function handleProjectDeleteBtnClick(projectId) {
    dispatch(deleteProject({ projectId, token }));
  }

  function handleProjectCreateBtnClick(newProject) {
    dispatch(addMyProject({ userId: id, newProject, token }));
    setModalFlag(false);
  }

  function closeAddProjectModal() {
    setModalFlag(false);
  }

  function handleProjectAddBtnClick() {
    setModalFlag(true);
  }

  function handleLogoutBtnClick() {
    console.log("click logout");
  }

  function handleProjectItemClick(projectId) {
    history.push(`/projects/${projectId}`);
    console.log("click project item", projectId);
  }

  function handleStatusMenuChange(statusMenuType) {
    console.log(statusMenuType, `clicked status menu ${statusMenuType}`);
  }

  return (
    <>
      {modalFlag && (
        <Modal onBackgroundClick={closeAddProjectModal}>
          <ProjectAddModalView
            onCancelBtnClick={closeAddProjectModal}
            onCreateBtnClick={handleProjectCreateBtnClick}
          />
        </Modal>
      )}
      <Projects
        userInfo={userInfo}
        projects={projects}
        onSideMenuChange={handleSideMenuChange}
        onProjectAddBtnClick={handleProjectAddBtnClick}
        onProjectDeleteBtnClick={handleProjectDeleteBtnClick}
        onLogoutBtnClick={handleLogoutBtnClick}
        onProjectItemClick={handleProjectItemClick}
        onStatusMenuChange={handleStatusMenuChange}
      />
    </>
  );
}
