import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  height: 100%;
`;

const CommentList = styled.div`
  background-color: #e3f1fe;
  border-radius: 10px;
`;

const Comment = styled.li`
  margin: 1vh 4vh;
  list-style: none;
  font-size: 1.3rem;
  border-radius: 10px;
`;


function IntervieweeDetailComments({ comments, createStars }) {
  return (
    <Comments>
      {
        comments ?
          comments.map(comment =>
            <>
              <IntervieweeDetailUserInfo commenterInfo={comment.commenter}/>
              <CommentList>
                <Comment>총평: {comment.score}{createStars(comment.score)}</Comment>
                <Comment>코멘트: {comment.comment}</Comment>
              </CommentList>
            </>
          )
          : "No comments"
      }
    </Comments>
  );
}

export default IntervieweeDetailComments;
