import React from "react";
import styled from "styled-components";

import TotalResultItem from "../TotalResultItem";

const TotalResultEntryWrapper = styled.div`
  width: 100%;
  height: 480px;
  border: 1px solid ${({ theme }) => theme.LinkWater };
  border-radius: 2px;
  overflow-y: scroll;
`;

export default function TotalResultEntry({
  interviewees,
  columnList,
  onItemClick,
}) {
  return (
    <TotalResultEntryWrapper>
      {interviewees.map((interviewee) => (
        <TotalResultItem
          key={interviewee.id}
          onClick={onItemClick}
          columnList={columnList}
          interviewee={interviewee}
        />
      ))}
    </TotalResultEntryWrapper>
  );
}
