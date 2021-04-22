import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import WelcomePage from "../pages/WelcomePage";

export default function WelcomeContainer() {

  const { projectId, intervieweeId } = useParams();
  const history = useHistory();

  console.log(projectId, intervieweeId, "params");

  function handleAskPermissionBtnClick(e) {
    e.preventDefault();
    console.log("comparing with state");

    // interviewee id와 리덕스 내의 id에서 찾아본다
  }

  return (
    <>
      <WelcomePage
        onAskPermissionBtnClick={handleAskPermissionBtnClick}
      />
    </>
  );
}
