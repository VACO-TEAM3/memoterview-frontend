import React from "react";
import styled from "styled-components";

import Calendar from "../Calendar";
import TotalResultIntervieweeList from "../TotalResultIntervieweeList";

const TotalResultContentTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 50px;
  height: 35vh;
  box-sizing: border-box;
`;

export default function TotalResultContentTop({ onIntervieweeAddBtnClick }) {
  return (
    <TotalResultContentTopWrapper>
      <Calendar />
      <TotalResultIntervieweeList onAddBtnClick={onIntervieweeAddBtnClick}/>
    </TotalResultContentTopWrapper>
  );
}
