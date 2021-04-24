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
  width: ${props => props.size};
  height: ${props => props.size};
`;

const UserName = styled.div`
  font-size: ${props => props.nameSize};
  margin: 0.5vh;
`;

const UserEmail = styled.div`
  font-size: 1.5rem;
  margin: 0.5vh;
`;


function IntervieweeDetailUserInfo({ name, email, commenterInfo }) {
  // mock intervieweeAvatar
  const intervieweeAvatar = legos[1];

  const avatar = commenterInfo ? commenterInfo.avatar : intervieweeAvatar;
  const displayingName = commenterInfo ? commenterInfo.username : name;
  const avatarSize = commenterInfo ? "50px" : "100px";
  const nameSize = commenterInfo ? "1.5rem" : "2.5rem";

  return (
    <UserInfo>
      <UserIconWrapper>
        <UserIcon avatarSize={avatarSize} avatar={avatar} />
      </UserIconWrapper>
      <UserInfoWrapper>
        <UserName nameSize={nameSize}>{displayingName}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfoWrapper>
    </UserInfo>
  );
}


export default IntervieweeDetailUserInfo;
