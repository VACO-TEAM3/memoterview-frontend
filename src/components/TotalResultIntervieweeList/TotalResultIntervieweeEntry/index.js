import React from "react";
import styled from "styled-components";

import TotalResultIntervieweeItem from "../TotalResultIntervieweeItem";

const TotalResultIntervieweeEntryWrapper = styled.div`
  width: 100%;
  height: calc(320px - 40px);
  overflow-y: scroll;
`;

export default function TotalResultIntervieweeEntry({ interviewees }) {
  return (
    <TotalResultIntervieweeEntryWrapper>
      {interviewees.map((interviewee) => (
        <TotalResultIntervieweeItem key={interviewee.id} interviewee={interviewee} />
      ))}
    </TotalResultIntervieweeEntryWrapper>
  );
}
