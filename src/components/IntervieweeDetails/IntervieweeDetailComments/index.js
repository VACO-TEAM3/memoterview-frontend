import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.LinkWater};
  border-radius: 10px;
  height: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.DetailPageBlue};
  border-radius: 7px;
`;

const Comment = styled.li`
  margin: 1vh 4vh;
  list-style: none;
  font-size: 1.3rem;
  border-radius: 10px;
`;

function IntervieweeDetailComments({ comments }) {
  return (
    <Comments>
      {
        comments ?
          comments.map(comment =>
            <>
              <CommentWrapper>
                <IntervieweeDetailUserInfo commenterInfo={comment.commenter}/>
              </CommentWrapper>
              <Comment>총평: {comment.score}</Comment>
              <Comment>코멘트: {comment.comment}</Comment>
            </>
          )
          : "No comments"
      }
    </Comments>
  );
}

export default IntervieweeDetailComments;
