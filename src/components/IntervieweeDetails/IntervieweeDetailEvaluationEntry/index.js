import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";


const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  background-color: hotpink;
`;

const EvaluationDetailHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5vh;
  background-color: blueviolet;
`;

const Comments = styled.div`
  display: flex;
  width: 80vw;
  background-color: whitesmoke;
`;



function IntervieweeDetailEvaluationEntry({ comments }) {

  return (
    <EvaluationDetailWrapper>
      <EvaluationDetailHeader>평가 디테일</EvaluationDetailHeader>
      <div>
        <Comments>
          <div>
            {
              comments.length ?
                comments.map(comment =>
                  <>
                    <IntervieweeDetailUserInfo userInfo={comment.commentor}/>
                    <ul>
                      <li>총평: {comment.score}</li>
                      <li>코멘트: {comment.comment}</li>
                    </ul>
                  </>
                )
                : "faBatteryEmpty..."
            }
          </div>
        </Comments>
      </div>
    </EvaluationDetailWrapper>

  );
}

export default IntervieweeDetailEvaluationEntry;


