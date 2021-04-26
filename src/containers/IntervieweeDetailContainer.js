import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { STARS } from "../constants/interviewee";
import IntervieweeDetail from "../pages/IntervieweeDetail";
import { createStars } from "../utils/createStars";

export default function IntervieweeDetailContainer() {
  const history = useHistory();

  const { projectId, intervieweeId } = useParams();
  const { interviewees: { byId } } = useSelector(({ interviewees }) => ({ interviewees }));

  function handleGoBackButtonClick(e) {
    e.preventDefault();

    history.push(`/projects/${projectId}`);
  }

  function setIntervieweeInfo(currentUserInfo) {

    return {
      name: currentUserInfo?.name,
      email: currentUserInfo?.email,
      comments: currentUserInfo?.comments,
      questions: currentUserInfo?.questions,
      commentAvgScore: currentUserInfo?.commentAvgScore,
    };
  };

  function handleGeneratePdfBtnClick(e) {
    console.log("pdf btn clicked");
  }

  return (
    <>
      <IntervieweeDetail
        onGeneratePdfBtnClick={handleGeneratePdfBtnClick}
        onGoBackButtonClick={handleGoBackButtonClick}
        intervieweeInfo={setIntervieweeInfo(byId[intervieweeId])}
      />
    </>
  );
}
