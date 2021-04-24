import React from "react";
import styled from "styled-components";

import TotalResultIntervieweeEntry from "./TotalResultIntervieweeEntry";
import TotalResultIntervieweeListHeader from "./TotalResultIntervieweeListHeader";

const TotalResultIntervieweeListWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  border-radius: 2px;
  box-sizing: border-box;
`;

export default function TotalResultIntervieweeList({ onAddBtnClick }) {
  return (
    <TotalResultIntervieweeListWrapper style={{ backgroundColor: "blue" }}>
      <TotalResultIntervieweeListHeader onAddBtnClick={onAddBtnClick} />
      <TotalResultIntervieweeEntry />
    </TotalResultIntervieweeListWrapper>
  );
}
