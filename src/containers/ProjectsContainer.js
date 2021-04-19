import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MENUS, PROJECT_TYPES } from "../constants/projects";
import Projects from "../pages/Projects";
import { getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { changeDateFormat } from "../utils/date";

export default function ProjectsPageContainer() {
  const dispatch = useDispatch();
  const { user: { token, userData: { id } } } = useSelector(({ user }) => ({ user }));
  const { projects: { byId, visibleProjects } } = useSelector(({ projects }) => ({ projects }));

  const [projects, setProjects] = useState(PROJECT_TYPES.MY_PROJECTS);
  const currentDisplayingField = visibleProjects[projects];

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

  return (
    <>
      <Projects
        projects={setProjectFormat(currentDisplayingField)}
        handleStatusMenuChange={() => {}}
        handleSideMenuChange={handleSideMenuChange}
      />
    </>
  );
}
