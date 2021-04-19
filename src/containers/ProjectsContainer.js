import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MENU_TITLE, MENUS } from "../constants/projects";
import Projects from "../pages/Projects";
import { getJoinedProjects, getMyProjects } from "../redux/reducers/projects";

export default function ProjectsPageContainer() {
  const dispatch = useDispatch();
  const { user: { token, userData: { id } } } = useSelector(({ user }) => ({ user }));
  const { projects: { byId, visibleProjects: { myProjects, joinedProjects } } } = useSelector(({ projects }) => ({ projects }));

  const [projects, setProjects] = useState(myProjects);

  useEffect(() => {
    dispatch(getMyProjects({ userId: id, token }));
  }, []);

  useEffect(() => {
    const myFilter = setProjectFormat(myProjects);
    setProjects(myFilter);
  }, [myProjects]);

  useEffect(() => {
    const joinedFilter = setProjectFormat(joinedProjects);
    setProjects(joinedFilter);
  }, [joinedProjects]);

  function setProjectFormat(projects) {
    return projects.map(projectId => {
      const { id, title, candidateNum, createAt } = byId[projectId];
      const parsedDate = parseISO(createAt);

      return {
        id,
        title,
        candidateNum,
        createAt: format(parsedDate, "yyyy-MM-dd"),
      };
    });
  }

  function handleSideMenuChange(menu) {
    if (menu === MENUS.MY) {
      const myfilter = setProjectFormat(myProjects);
      setProjects(myfilter);
      return;
    }

    if (!joinedProjects.length){
      dispatch(getJoinedProjects({ userId: id, token }));

      const joinedfilter = setProjectFormat(joinedProjects);
      setProjects(joinedfilter);
    }

    const joinedfilter = setProjectFormat(joinedProjects);
    setProjects(joinedfilter);
  }

  return (
    <>
      <Projects
        projects={projects}
        handleStatusMenuChange={() => {}}
        handleSideMenuChange={handleSideMenuChange}
      />
    </>
  );
}
