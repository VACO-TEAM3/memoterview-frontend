import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Projects from "../pages/Projects";
import { getMyProjects } from "../redux/reducers/projects";

export default function ProjectsPageContainer() {
  const dispatch = useDispatch();
  const { user: { token, userData: id }, projects: { byId, allIds } } = useSelector(({ user, projects }) => ({ user, projects }));

  const projectFormat = allIds.map(userId => {
    const { id, title, candidateNum, createAt } = byId[userId];

    return {
      id,
      title,
      candidateNum,
      createAt,
    };
  });

  useEffect(() => {
    dispatch(getMyProjects({ userId: id, token }));
  }, []);

  return (
    <>
      <Projects projects={projectFormat} />
    </>
  );
}
