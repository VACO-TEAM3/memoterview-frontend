import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useToken from "../hooks/useToken";
import IntervieweeDetail from "../pages/IntervieweeDetail";
import { getInterviewees } from "../redux/reducers/interviewee";

export default function IntervieweeDetailContainer() {
  const dispatch = useDispatch();
  const { interviewee: { byId } } = useSelector(({ interviewee }) => ({ interviewee }));
  const { token } = useToken();
  const { projectId, intervieweeId } = useParams();
  const history = useHistory();

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
        intervieweeInfo={setIntervieweeInfo(byId[intervieweeId])}
      />
    </>
  );
}
