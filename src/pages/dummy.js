import React from "react";
import { useDispatch } from "react-redux";

import { getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
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

  function handleGetMyPorjectsClick() {
    dispatch(getMyProjects("userId"));
  }

  function handleGetJoinedPorjectsClick() {
    dispatch(getJoinedProjects("userId"));
  }

  return (
    <div>
      <button onClick={handleLoginClick}>login</button>
      <button onClick={handleGetMyPorjectsClick}>get my projects</button>
      <button onClick={handleGetJoinedPorjectsClick}>get joined project</button>
    </div>
  );
}
