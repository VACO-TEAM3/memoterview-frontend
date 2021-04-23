import React from "react";
import styled from "styled-components";

import Calendar from "../Calendar";

const TotalResultContentTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 50px;
  height: 35vh;
  background-color: gray;
  box-sizing: border-box;
`;

const TotalResultIntervieweeListWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export default function TotalResultContentTop({ onIntervieweeAddBtnClick }) {
  return (
    <TotalResultContentTopWrapper>
      <Calendar />
      <TotalResultIntervieweeListWrapper style={{ backgroundColor: "blue" }}>
        <div></div>
        <button onClick={onIntervieweeAddBtnClick}>
          ADD INTERVIEWEE MODAL
        </button>
      </TotalResultIntervieweeListWrapper>
    </TotalResultContentTopWrapper>
  );
}
