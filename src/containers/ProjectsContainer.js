import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import ProjectAddModalView from "../components/ProjectAddModalView";
import { MENUS, PROJECT_TYPES } from "../constants/projects";
import useToken from "../hooks/useToken";
import Projects from "../pages/Projects";
import { addMyProject, deleteProject, getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { changeDateFormat } from "../utils/date";

export default function ProjectsPageContainer() {
  const { token } = useToken();
  const dispatch = useDispatch();
  const { user: { userData: { id, username, email } } } = useSelector(({ user }) => ({ user }));
  const { projects: { byId, visibleProjects } } = useSelector(({ projects }) => ({ projects }));

  const [projects, setProjects] = useState(PROJECT_TYPES.MY_PROJECTS);
  const currentDisplayingField = visibleProjects[projects];
  const [modalFlag, setModalFlag] = useState(false);

  const userInfo = {
    userName: username,
    userEmail: email,
  };

  useEffect(() => {
    dispatch(getMyProjects({ userId: id, token }));
  }, [dispatch, id, token]);

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
        projects={setProjectFormat(currentDisplayingField)}
        onSideMenuChange={handleSideMenuChange}
        onProjectAddBtnClick={handleProjectAddBtnClick}
        onProjectDeleteBtnClick={handleProjectDeleteBtnClick}
      />
    </>
  );
}
