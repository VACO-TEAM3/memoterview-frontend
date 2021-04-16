import React from "react";
import { useDispatch } from "react-redux";

import { addMyProjects, getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { loginUser } from "../redux/reducers/user";

export default function Dummy() {
  const dispatch = useDispatch();

  function handleLoginClick() {
    dispatch(loginUser({
      email: "hayeong28@naver.com",
      imgURL: "dfdsfasf",
      name: "최하영",
    }));
  }

  function handleGetMyProjectsClick() {
    dispatch(getMyProjects("userId"));
  }

  function handleGetJoinedProjectsClick() {
    dispatch(getJoinedProjects("userId"));
  }

  function handleAddMyProjectsClick() {
    dispatch(addMyProjects({
      userId: "asdfasdf",
      newProject: {
        title: "test",
        filter: ["컬쳐핏", "커뮤니케이션"],
        creator: "asdfasdf",
        participants: ["interviewer1", "interviewer2"],
      },
    }));
  }

  return (
    <div>
      <button onClick={handleLoginClick}>login</button>
      <button onClick={handleGetMyProjectsClick}>get my projects</button>
      <button onClick={handleGetJoinedProjectsClick}>get joined project</button>
      <button onClick={handleAddMyProjectsClick}>add my project</button>
    </div>
  );
}
