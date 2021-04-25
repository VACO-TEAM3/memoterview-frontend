import React from "react";
import styled from "styled-components";

import TotalResultEntry from "./TotalResultEntry";
import TotalResultListHeader from "./TotalResultListHeader";

const TotalResultListWrapper = styled.div`
  width: 100%;
`;

// const columnList = ["rate", "name", "questionAvg", "questionNum", "interviewDuration", "interviewDate"];
const columnList = ["평가", "지원자", "응답점수", "질문개수", "컬쳐핏지수", "면접시간", "면접일자"];

// const interviewees = [
//   {
//     id: 1,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 2,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 3,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 4,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 5,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 6,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 7,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 8,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   },
//   {
//     id: 9,
//     평가: 5,
//     지원자: "최하영",
//     응답점수: 5,
//     질문개수: 10,
//     컬쳐핏지수: 5,
//     면접시간: "1H",
//     면접일자: "2021-04-30",
//   }
// ];


export default function TotalResultList({ interviewees, onFilterBtnClick }) {
  return (
    <TotalResultListWrapper>
      <TotalResultListHeader columnList={columnList} onFilterBtnClick={onFilterBtnClick}/>
      <TotalResultEntry interviewees={interviewees} columnList={columnList}/>
    </TotalResultListWrapper>
  );
}
