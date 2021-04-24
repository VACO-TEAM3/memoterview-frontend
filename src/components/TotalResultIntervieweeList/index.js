import React from "react";
import styled from "styled-components";

import TotalResultIntervieweeEntry from "./TotalResultIntervieweeEntry";
import TotalResultIntervieweeListHeader from "./TotalResultIntervieweeListHeader";

const TotalResultIntervieweeListWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 2px;
  box-sizing: border-box;
`;

export default function TotalResultIntervieweeList({ onAddBtnClick, interviewees }) {
  return (
    <TotalResultIntervieweeListWrapper >
      <TotalResultIntervieweeListHeader onAddBtnClick={onAddBtnClick} />
      <TotalResultIntervieweeEntry interviewees={interviewees}/>
    </TotalResultIntervieweeListWrapper>
  );
}
