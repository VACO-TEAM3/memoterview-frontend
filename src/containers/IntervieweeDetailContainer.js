import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { generatePdfAPI } from "../api";
import { STARS } from "../constants/interviewee";
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
    let totalStarNums = STARS.TOTAL_STARS_NUMS;
    let fullStarNums = score;

    while (totalStarNums > 0) {
      if (fullStarNums > 0) {
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

  function createFinalScoreStars(comments) {
    let initialScore = 0;
    let averageScore;

    if (comments) {
      comments.forEach(comment => {
        initialScore += comment.score;
      });
      averageScore = Math.floor(initialScore / comments.length);
    }

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

  async function handleGeneratePdfBtnClick() {
    try {
      const result = await generatePdfAPI();
      const final = await result.json();

      console.log(final, "final");

    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    dispatch(getInterviewees({ projectId, token }));
  }, []);

  return (
    <>
      <IntervieweeDetail
        createStars={createStars}
        onGeneratePdfBtnClick={handleGeneratePdfBtnClick}
        createFinalScoreStars={createFinalScoreStars}
        onGoBackButtonClick={handleGoBackButtonClick}
        intervieweeInfo={setIntervieweeInfo(byId[intervieweeId])}
      />
    </>
  );
}
