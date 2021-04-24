import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useToken from "../hooks/useToken";
import { finishInterview } from "../redux/reducers/interviewee";
import { addMyProject, getJoinedProjects, getMyProjects } from "../redux/reducers/projects";
import { loginUser } from "../redux/reducers/user";

export default function Dummy() {
  const { token, setToken } = useToken();
  const history = useHistory();

  useEffect(() => {
    const interviewee = {
      filterScores: {
        curtureFit: 2,
        skill: 6,
        tech: 10,
      },
      questions: [
        {
          question: "adfdafafa",
          score: 24,
          answer: "afadfafafaf",
          questioner: "608056473ec0b1612a8ebce2",
        }
      ],
      comments: [
        {
          comment: "adfafadfafa",
          score: 24,
          commentor: "608056473ec0b1612a8ebce2",
        }
      ],
      isInterviewed: true,
    };
    history.push("/interview/adfadf/adfafafa");
    dispatch(getJoinedProjects({ token, userId: "607959226727251880113f56" }));
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
