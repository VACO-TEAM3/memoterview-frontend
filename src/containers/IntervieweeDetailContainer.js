import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useToken from "../hooks/useToken";
import IntervieweeDetail from "../pages/IntervieweeDetail";
import { getInterviewees } from "../redux/reducers/interviewee";

export default function IntervieweeDetailContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useToken();
  const { projectId, intervieweeId } = useParams();
  const { interviewee: { byId } } = useSelector(({ interviewee }) => ({ interviewee }));

  function handleGoBackButtonClick(e) {
    e.preventDefault();

    history.push(`/projects/${projectId}`);
  }

  function createStars(score) {
    const stars = [];
    let totalStarNums = 5;
    let fullStarNums = score;

    while (totalStarNums > 0) {
      if (fullStarNums > 0){
        stars.push(<FontAwesomeIcon icon={faStar}/>);
        fullStarNums--;
        totalStarNums--;
        continue;
      }

      stars.push(<FontAwesomeIcon icon={emptyStar}/>);
      totalStarNums--;
    }

    return stars;
  }

  function createTotalScoreStars(comments) {
    let initialScore = 0;

    if (comments) {
      comments.forEach(comment => {
        initialScore += comment.score;
      });
    }

    const averageScore = Math.floor(initialScore / comments.length);

    return createStars(averageScore);
  }

  function setIntervieweeInfo(currentUserInfo) {
    return {
      name: currentUserInfo?.name,
      email: currentUserInfo?.email,
      comments: currentUserInfo?.comments,
      questions: currentUserInfo?.questions,
    };
  };

  useEffect(() => {
    dispatch(getInterviewees({ projectId, token }));
  }, []);

  return (
    <>
      <IntervieweeDetail
        createStars={createStars}
        createTotalScoreStars={createTotalScoreStars}
        onGoBackButtonClick={handleGoBackButtonClick}
        intervieweeInfo={setIntervieweeInfo(byId[intervieweeId])}
      />
    </>
  );
}
