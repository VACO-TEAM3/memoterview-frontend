import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import useToken from "../hooks/useToken";
import { getInterviewees } from "../redux/reducers/interviewee";
import { addMyProject, closeInterviewRoom, getJoinedProjects, getMyProjects, updateInterviewRoom } from "../redux/reducers/projects";
import { loginUser } from "../redux/reducers/user";

export default function Dummy() {
  const { token, setToken } = useToken();
  console.log(token);
  const { id } = useParams();

  useEffect(() => {
    dispatch(updateInterviewRoom({ token, projectId: id, roomState: true }));
    console.log(25);
  }, []);

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

  function handleAddMyProjectClick() {
    dispatch(addMyProject({
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
      <button onClick={handleAddMyProjectClick}>add my project</button>
    </div>
  );
}
