import React from "react";
import styled from "styled-components";

import Calendar from "../Calendar";
import TotalResultIntervieweeList from "../TotalResultIntervieweeList";

const TotalResultContentTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 50px;
  height: 320px;
  box-sizing: border-box;
`;

export default function TotalResultContentTop({ onIntervieweeAddBtnClick, interviewees }) {
  return (
    <TotalResultContentTopWrapper>
      <Calendar />
      <TotalResultIntervieweeList onAddBtnClick={onIntervieweeAddBtnClick} interviewees={interviewees}/>
    </TotalResultContentTopWrapper>
  );
}
