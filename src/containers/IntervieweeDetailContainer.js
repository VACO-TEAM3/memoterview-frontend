import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { STARS } from "../constants/interviewee";
import IntervieweeDetail from "../pages/IntervieweeDetail";
import { createStars } from "../utils/createStars";

export default function IntervieweeDetailContainer() {
  const history = useHistory();

  const { projectId, intervieweeId } = useParams();
  const {
    intervieweeInfo,
  } = useSelector(({ interviewees: { byId } }) => ({ intervieweeInfo: getIntervieweeInfo(byId[intervieweeId]) }));

  function handleGoBackButtonClick(e) {
    e.preventDefault();

    history.push(`/projects/${projectId}`);
  }

  function getIntervieweeInfo(currentUserInfo) {
    return {
      name: currentUserInfo?.name,
      email: currentUserInfo?.email,
      comments: currentUserInfo?.comments,
      questions: currentUserInfo?.questions,
      commentAvgScore: currentUserInfo?.commentAvgScore,
    };
  }

  function handleGeneratePdfBtnClick(e) {

  }

  return (
    <div>
      <IntervieweeDetail
        onGeneratePdfBtnClick={handleGeneratePdfBtnClick}
        onGoBackButtonClick={handleGoBackButtonClick}
        intervieweeInfo={intervieweeInfo}
      />
    </div>
  );
}
