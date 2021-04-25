import React from "react";
import styled from "styled-components";

import TotalResultItem from "../TotalResultItem";

const TotalResultEntryWrapper = styled.div`
  width: 100%;
  height: 450px;
  border: 1px solid gray;
  border-radius: 2px;
  overflow-y: scroll;
`;

export default function TotalResultEntry({
  interviewees,
  columnList,
}) {
  return (
    <TotalResultEntryWrapper>
      {interviewees.map((interviewee) => (
        <TotalResultItem
          key={interviewee.id}
          columnList={columnList}
          interviewee={interviewee}
        />
      ))}
    </TotalResultEntryWrapper>
  );
}
