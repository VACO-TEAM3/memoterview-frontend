import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import TotalResultIntervieweeColumn from "../TotalResultIntervieweeColumn";
import TotalResultIntervieweeRow from "../TotalResultIntervieweeRow";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px 20px;
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.Aero};
  border: 1px solid gray;
  border-radius: 2px;
  box-sizing: border-box;
  transition: opacity 0.3s linear;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export default function TotalResultIntervieweeItem({
  interviewee,
  onDeleteBtnClick,
  onInviteBtnClick,
  onRoomEnterBtnClick,
}) {
  function handleDeleteBtnClick() {
    onDeleteBtnClick(interviewee.id);
  }

  function handleInviteBtnClick() {
    onInviteBtnClick(interviewee.id);
  }

  function handleRoomEnterBtnClick() {
    onRoomEnterBtnClick(interviewee.id);
  }

  return (
    <TotalResultIntervieweeRow>
      <TotalResultIntervieweeColumn>
        {interviewee.name}
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        {interviewee.email}
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <Button onClick={handleInviteBtnClick}>면접 초대</Button>
        <Button onClick={handleRoomEnterBtnClick}>면접 입장</Button>
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <FontAwesomeIcon icon={faTimes} onClick={handleDeleteBtnClick} />
      </TotalResultIntervieweeColumn>
    </TotalResultIntervieweeRow>
  );
}
