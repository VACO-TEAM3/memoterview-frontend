import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import WelcomePage from "../pages/WelcomePage";
import { setUser } from "../redux/reducers/user";

export default function WelcomeContainer() {
  const dispatch = useDispatch();

  const [newUserInfo, setNewUserInfo] = useState({ email: "", name: "" });
  const { projectId, intervieweeId } = useParams();
  const history = useHistory();

  function handleInputChange(event) {
    event.preventDefault();

    const newUserInfoType = event.target.name;
    const value = event.target.value;

    setNewUserInfo({
      ...newUserInfo,
      [newUserInfoType]: value,
    });
  }

  function handleAskPermissionBtnClick(e) {
    e.preventDefault();

    history.push(`/interview/${projectId}/${intervieweeId}`);
    dispatch(setUser({ username: newUserInfo.name, email: newUserInfo.email }));
  }

  return (
    <>
      <WelcomePage
        onInputChange={handleInputChange}
        onAskPermissionBtnClick={handleAskPermissionBtnClick}
      />
    </>
  );
}