import React from "react";
import styled from "styled-components";

import { legos } from "../../../constants/legos";
import UserIcon from "../../UserIcon";

const UserInfo = styled.div`
  display: flex;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
`;

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  margin: 0.5vh;
`;

const UserEmail = styled.div`
  font-size: 1rem;
  margin: 0.5vh;
`;

function intervieweeDetailUserInfo({ name, email, commenterInfo }) {
  // mock intervieweeAvatar
  const intervieweeAvatar = legos[1];

  const avatar = commenterInfo ? commenterInfo.avatar : intervieweeAvatar;
  const displayingName = commenterInfo ? commenterInfo.username : name;

  return (
    <UserInfo>
      <UserIconWrapper>
        <UserIcon avatar={avatar} />
      </UserIconWrapper>
      <UserInfoWrapper>
        <UserName>{displayingName}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfoWrapper>
    </UserInfo>
  );
}

export default intervieweeDetailUserInfo;
