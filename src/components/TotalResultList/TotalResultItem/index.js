import React from "react";

import TotalResultListColumn from "../TotalResultListColumn";
import TotalResultListRow from "../TotalResultListRow";

function getAverages(scroes) {
  return scroes
    ? scroes.reduce((acc, score) => typeof score === "object"  ? acc + score.score : acc + score, 0) / scroes.length
    : 0;
}

function mappedFilterValue({ interviewee, columnItem }) {
  switch (columnItem) {
    case "평가":
      return getAverages(interviewee.comments);
    case "지원자":
      return interviewee.name;
    case "응답점수":
      return getAverages(interviewee.questions);
    case "질문개수":
      return interviewee.questions.length;
    case "면접시간":
      return interviewee.interviewDuration;
    case "면접일자":
      return interviewee.interviewDate;
    default:
      return interviewee.filterScores ? getAverages(interviewee.filterScores[columnItem]) : 0;
  }
}

export default function TotalResultItem({ interviewee, columnList }) {
  return (
    <TotalResultListRow>
      {columnList.map((columnItem) => (
        <TotalResultListColumn key={columnItem}>
          {mappedFilterValue({ interviewee, columnItem })}
        </TotalResultListColumn>
      ))}
    </TotalResultListRow>
  );
}
